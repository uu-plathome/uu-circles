// ES module-style import
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

if (process.env.BUGSNAG_API_KEY) {
  const originalConsoleError = console.error

  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
  })

  console.error = (...data: any[]) => {
    data.length > 0 && Bugsnag.notify(data[0])
    originalConsoleError(...data)
  }
}

export { Bugsnag }
