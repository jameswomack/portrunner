const test = require('tape')
const Sinon = require('sinon')
const portRunner = require('./')


test('portRunner', ({ end }) => {
  test('returns a promise', ({ equal, end }) => {
    equal(portRunner(() => { }) instanceof Promise, true)
    end()
  })

  test('resolves to a port', ({ ok, end }) => {
    const spy = Sinon.spy()
    portRunner(spy)
      .then(() => {
        ok(typeof spy.firstCall.args[0] === 'number')
        end()
      })
  })

  test('uses passed default', ({ equal, end }) => {
    const spy = Sinon.spy()
    portRunner(spy, { defaultPort : 1337 })
      .then(() => {
        equal(spy.firstCall.args[0], 1337)
        end()
      })
  })

  test('logs if the deault cannot be used', ({ equal, end }) => {
    const http = require('http')
    // Using strub to prevent log from leaking into test output
    Sinon.stub(console, 'info')
    const s = http.createServer(() => { })
    s.listen(1337, () => {
      portRunner(() => { }, { defaultPort : 1337 })
        .then(() => {
          equal(console.info.firstCall.args[0], '1337 wasn\'t available, using 1338')
          console.info.restore()
          s.close()
          end()
        })
    })
  })

  end()
})
