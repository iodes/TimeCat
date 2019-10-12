import moment from 'moment';

export default [
  {
    label: 'EJ의 Macbook Pro',
    data: [
      {
        label: "I'm a label with a custom class",
        from: moment('2019-10-13 10:11:11', 'YYYY-MM-DD HH:mm:ss'),
        to: moment('2019-10-13 13:11:11', 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
  }, 
  {
    label: 'Project',
    data: [
      {
        label: 'Label 1',
        from: moment('2019-10-13 15:11:11', 'YYYY-MM-DD HH:mm:ss'),
        to: moment('2019-10-13 16:50:11', 'YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: 'Label 2',
        from: moment('2019-10-13 17:00:11', 'YYYY-MM-DD HH:mm:ss'),
        to: moment('2019-10-13 17:40:11', 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
  },
];
