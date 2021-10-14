/**
 * @param {RTCPeerConnection} pc
 * @param {string} url
 */
function startShipping(pc, url) {

    const ct = { 'Content-Type': 'application/json' }

    const period = 30 * 1000 // milliseconds

    // launch first with no delay
    setTimeout(myCallback, 0, id)

    function myCallback(id) {
        pc.getStats(null).then(stats => {
            let json = JSON.stringify(Object.fromEntries(stats))

            let fo = { method: 'POST', headers: ct, body: json }

            fetch(url, fo)

            setTimeout(myCallback, period, id)
        })

    }
}
