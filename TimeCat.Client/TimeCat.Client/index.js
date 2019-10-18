const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

async function openMainWindow()
{
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hiddenInset',
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();

  await mainWindow.webContents.loadFile('frontend/index.html');
}

app.on('ready', openMainWindow);
app.on('activate', openMainWindow);

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return;

  app.quit();
});

const grpc = require('grpc');

const { RpcCategoryServiceClient } = require('./proto/core/services/category_service_grpc_pb');
const { RpcCommonServiceClient } = require('./proto/core/services/common_service_grpc_pb');
const { RpcDashboardServiceClient } = require('./proto/core/services/dashboard_service_grpc_pb');
const { RpcDetailServiceClient } = require('./proto/core/services/detail_service_grpc_pb');
const { RpcMainServiceClient } = require('./proto/core/services/main_service_grpc_pb');
const { RpcReviewServiceClient } = require('./proto/core/services/review_service_grpc_pb');
const { HealthCheckRequest } = require('./proto/core/services/common_service_pb');
const { Timestamp } = require('./proto/google/protobuf/timestamp_pb');

const { Empty } = require('./proto/core/common_pb');

let category = new RpcCategoryServiceClient('localhost:37013', grpc.credentials.createInsecure());
let common = new RpcCommonServiceClient('localhost:37013', grpc.credentials.createInsecure());
let dashboard = new RpcDashboardServiceClient('localhost:37013', grpc.credentials.createInsecure());
let detail = new RpcDetailServiceClient('localhost:37013', grpc.credentials.createInsecure());
let main = new RpcMainServiceClient('localhost:37013', grpc.credentials.createInsecure());
let review = new RpcReviewServiceClient('localhost:37013', grpc.credentials.createInsecure());

let commands = {
  'category.GetCategories': (data, callback) => {
    let request = new Empty();

    category.getCategories(request, (err, response) => {
      if (err) return;

      console.log(response);

      callback(response);
    });
  },
  'category.CreateCategory': (data, callback) => {

  },
  'category.UpdateCategory': (data, callback) => {

  },
  'category.DeleteCategory': (data, callback) => {

  },
  'common.Initialize': (data, callback) => {

  },
  'common.HealthCheck': (data, callback) => {
    let request = new HealthCheckRequest();
    let currentTime = new Timestamp();
    let responseTime = new Timestamp();

    currentTime.fromDate(new Date(data.currentTime));
    responseTime.fromDate(new Date(data.responseTime));

    request.setCurrenttime(currentTime);
    request.setResponsetime(responseTime);

    common.healthCheck(request, (err, response) => {
      if (err) return;

      let currentTime = response.getCurrenttime().toDate();
      let requestTime = response.getRequesttime().toDate();

      callback({
        currentTime,
        requestTime,
      });
    });
  },
  'dashboard.GetTotalTime': (data, callback) => {

  },
  'dashboard.GetApplications': (data, callback) => {

  },
  'main.SetDateRange': (data, callback) => {

  },
  'main.Search': (data, callback) => {

  },
  'review.GetTimeline': (data, callback) => {

  },
};

ipcMain.on('grpc', (event, command, request) => {
  if (!(command in commands)) return;

  commands[command](request, (response) => {
    event.reply('grpc', command, response);
  });
});
