const { app, BrowserWindow, ipcMain } = require('electron');

const grpc = require('grpc');

const { RpcCategoryServiceClient } = require('./proto/core/services/category_service_grpc_pb');
const { RpcCommonServiceClient } = require('./proto/core/services/common_service_grpc_pb');
const { RpcDashboardServiceClient } = require('./proto/core/services/dashboard_service_grpc_pb');
const { RpcDetailServiceClient } = require('./proto/core/services/detail_service_grpc_pb');
const { RpcMainServiceClient } = require('./proto/core/services/main_service_grpc_pb');
const { RpcReviewServiceClient } = require('./proto/core/services/review_service_grpc_pb');

const { Empty, TimestampRange } = require('./proto/core/common_pb');
const { InitializeRequest, HealthCheckRequest } = require('./proto/core/services/common_service_pb');
const { CategoryCreateRequest, CategoryUpdateRequest, CategoryDeleteRequest } = require('./proto/core/services/category_service_pb');
const { TotalTimeRequest, ApplicationRequest } = require('./proto/core/services/dashboard_service_pb');
const { DateRangeRequest, SearchRequest } = require('./proto/core/services/main_service_pb');
const { TimelineRequest } = require('./proto/core/services/review_service_pb');
const { Timestamp } = require('./proto/google/protobuf/timestamp_pb');

let category = new RpcCategoryServiceClient('localhost:37013', grpc.credentials.createInsecure());
let common = new RpcCommonServiceClient('localhost:37013', grpc.credentials.createInsecure());
let dashboard = new RpcDashboardServiceClient('localhost:37013', grpc.credentials.createInsecure());
let detail = new RpcDetailServiceClient('localhost:37013', grpc.credentials.createInsecure());
let main = new RpcMainServiceClient('localhost:37013', grpc.credentials.createInsecure());
let review = new RpcReviewServiceClient('localhost:37013', grpc.credentials.createInsecure());

const convertTimestamp = (date) => {
  let timestamp = new Timestamp();
  timestamp.fromDate(new Date(date));

  return timestamp;
};

const convertTimestampRange = (range) => {
  let timestampRange = new TimestampRange();

  let start = convertTimestamp(range.start);
  let end = convertTimestamp(range.end);

  timestampRange.setStart(start);
  timestampRange.setEnd(end);

  return timestampRange;
};

const wrap = (callback, error) => (err, response) => {
  if (err) return error(err);

  callback(response.toObject());
};

let calls = {
  'category.GetCategories': (data, callback, error) => {
    let request = new Empty();

    category.getCategories(request, wrap(callback, error));
  },

  'category.CreateCategory': (data, callback, error) => {
    let request = new CategoryCreateRequest();
    request.setParentid(data.parentId);
    request.setName(data.name);
    request.setColor(data.color);

    category.createCategory(request, wrap(callback, error));
  },

  'category.UpdateCategory': (data, callback, error) => {
    let request = new CategoryUpdateRequest();
    request.setId(data.id);
    request.setName(data.name);
    request.setColor(data.color);
    request.setParentid(data.parentId);

    category.updateCategory(request, wrap(callback, error));
  },

  'category.DeleteCategory': (data, callback, error) => {
    let request = new CategoryDeleteRequest();
    request.setId(data.id);

    category.deleteCategory(request, wrap(callback, error));
  },

  'dashboard.GetTotalTime': (data, callback, error) => {
    let request = new TotalTimeRequest();

    let range = convertTimestampRange(data.range);
    request.setRange(range);

    dashboard.getTotalTime(request, wrap(callback, error));
  },

  'main.SetDateRange': (data, callback, error) => {
    let request = new DateRangeRequest();

    let range = convertTimestampRange(data.range);
    request.setRange(range);

    dashboard.setDateRange(request, wrap(callback, error))
  },

  'main.Search': (data, callback, error) => {
    let request = new SearchRequest();
    request.setKeyword(data.keyword);

    dashboard.search(request, wrap(callback, error));
  },
};

const streams = {
  'dashboard.GetApplications': (data, callback, end) => {
    let request = new ApplicationRequest();

    let range = convertTimestampRange(data.range);
    request.setRange(range);

    let stream = dashboard.getApplications(request);
    stream.on('data', (data) => callback(data));
    stream.on('end', () => end());
  },

  'review.GetTimeline': (data, callback, end) => {
    let request = new TimelineRequest();

    let range = convertTimestampRange(data.range);
    request.setRange(range);

    let stream = review.getTimeline(request);
    stream.on('data', callback);
    stream.on('end', end);
  },
};

ipcMain.on('grpc', (event, command, id, request) => {
  if (!(command in calls)) return;

  calls[command](request, (response) => {
    event.reply('grpc', command, id, response);
  }, (err) => {
    event.reply('grpc.error', command, id, err);
  });
});

ipcMain.on('grpc.stream', (event, command, id, request) => {
  if (!(command in streams)) return;

  streams[command](request, (data) => {
    event.reply('grpc.data', command, id, data.toObject());
  }, () => {
    event.reply('grpc.end', command, id);
  });
});

let mainWindow;
async function openMainWindow()
{
  if (mainWindow) return;

  let request = new InitializeRequest();
  request.setAppversion('1.0.0');

  common.initialize(request, (err, response) => {
    if (err) return app.quit();

    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
      titleBarStyle: (process.platform === 'darwin') ? undefined : 'hidden',
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    mainWindow.webContents.openDevTools();
    mainWindow.webContents.loadFile('frontend/index.html');
  });
}

app.on('ready', openMainWindow);
app.on('activate', openMainWindow);

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return;

  app.quit();
});
