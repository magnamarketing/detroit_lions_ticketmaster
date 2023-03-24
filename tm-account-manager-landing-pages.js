let timerVar = setInterval(() => {
    if (typeof Evergage != 'undefined') {
        
        Evergage.init({
   
        }).then(() => {
              
            Evergage.initSitemap({
                global: {},
                pageTypeDefault: {
                    name: "TicketmasterDefault",
                },
                pageTypes: [{
                    name: "TM Account Manager Landing Pages",
                    action: "TM Account Manager Landing Pages",
                    isMatch: () => true,
                }]
            });   // Initializes the Sitemap
        });

        const sendUserId = () => {
            if (/persistUserId/.test(window.location.href)) {
                try {
                    const anonId = location.href.split("persistUserId=")[1].split('&')[0];
                    Evergage.sendEvent({
                        name: "Ticketmaster ID merge",
                        action: "Ticketmaster ID merge",
                        user: {
                            attributes: {
                                persistId: anonId
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
        
        const sendAddToCart = () => {
            Evergage.sendEvent({
                itemAction: Evergage.ItemAction.AddToCart,
                action: "Add To Cart",
                cart: {
                    singleLine: {
                        Product: {
                            _id: '$event_id$',
                            price: 100,
                            quantity: 1
                        }
                    }
                }
            })
        }
        
        if ("" != "$event_id$") {
            sendAddtoCart();
        };
        
        sendUserId();
    }
}, 2000)
