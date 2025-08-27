const AppConfig = {
  api: {
    provider: 'local' as 'local' | 'url', // can be 'url',
    url: '',
    // url: 'https://uala-dev-challenge.s3.us-east-1.amazonaws.com',
  },
  filters: {
    date: {
      min: new Date('2025-01-01'),
      max: new Date('2025-12-31'),
    },
    amount: {
      min: 0,
      max: 2000,
    },
  },
}

export default AppConfig
