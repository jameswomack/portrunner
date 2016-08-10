// Based on code from https://github.com/facebookincubator/create-react-app
const detect = require('detect-port')


const DEFAULT_PORT = process.env.PORT || 3000


module.exports = function (run, { defaultPort = DEFAULT_PORT } = { }) {
	// We attempt to use the default port but if it is busy, we allow the app to
	// run on a different port. `detect()` Promise resolves to the next free port.
	return detect(defaultPort).then(port => {
		port !== defaultPort &&
		  console.info(`${defaultPort} wasn't available, using ${port}`)

		run(port)
	})
}
