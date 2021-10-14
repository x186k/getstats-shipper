//@ts-check  
//The @ts-check statement above enables jsdoc typechecking
// https://stackoverflow.com/a/52076280/86375
// http://demo.unified-streaming.com/players/dash.js-2.4.1/build/jsdoc/jsdoc_cheat-sheet.pdf

/**
 * @param {RTCPeerConnection} pc
 * @param {string} url
 */
function startShipping(pc, url) {

    const ct = { 'Content-Type': 'application/json' }

    const period = 30 * 1000 // milliseconds

    // launch first with no delay
    setTimeout(myCallback, 0)

    function myCallback() {
        pc.getStats(null).then(stats => {
            let json = JSON.stringify(Object.fromEntries(stats))

            let fo = { method: 'POST', headers: ct, body: json }

            fetch(url, fo)

            setTimeout(myCallback, period)
        })

    }
}
