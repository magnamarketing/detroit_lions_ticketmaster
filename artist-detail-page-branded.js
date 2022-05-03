Evergage.init({
   
}).then(() => {
      
    Evergage.initSitemap({
        global: {},
        pageTypeDefault: {
            name: "TicketmasterDefault",
        },
        pageTypes: [{
            name: "tmArtistPageBranded",
            action: "Ticketmaster Artist Branded",
            isMatch: () => true,
        }]
    });

const sendUserId = () => {
    if (/persistId/.test(window.location.href)) {
        try {
            const anonId = location.href.split("persistId=")[1];
            Evergage.sendEvent({
                name: "Ticketmaster ID merge",
                action: "Ticketmaster ID merge",
                user: {
                    attributes: {
                        persistId: persistId
                    }
                }
            })
        } catch (e) {
            Evergage.sendEvent({
                name: "Ticketmaster ID merge Failed",
                action: "Ticketmaster ID merge Failed"
            })
        }
    }

}

// Abandoned Browse Event 

const abandonedBrowse = () => {
    Evergage.DisplayUtils.pageExit(1000).then(() => {
        Evergage.sendEvent({
            action: "Ticketmaster Abandoned Browse"
        })
    })
}

sendUserId();
abandonedBrowse();