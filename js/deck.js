var Card = (function() {
    var Card = function Card(details) {
        var self = this;

        if (typeof details == 'string') {
            this.id = details;

            if (Card.Definitions && (details in Card.Definitions)) {
                Object.keys(Card.Definitions[details]).map(function(key) {
                    if (Card.Definitions[details].hasOwnProperty(key)) {
                        self[key] = Card.Definitions[details][key];
                    }
                });
            }
        }
        else {
            if (!('id' in details)) {
                throw new TypeError('Expected object including key "id".');
            }

            Object.keys(details).map(function(key) {
                if (details.hasOwnProperty(key)) {
                    self[key] = details[key];
                }
            });
        }
    };

    Card.prototype.toString = function() {
        if (this.title) {
            return this.title;
        }
        else if (this.deck) {
            if (this.deck.options.format) {
                return this.deck.options.format
                    .replace(/\{card\}/g, this.title || this.name || this.value)
                    .replace(/\{group\}/g, this.group ? this.group.title || this.group.name || this.group.value : '')
            }
        }

        return this.id;
    };

    return Card;
})();

var Deck = (function() {
    var Deck = function Deck(cards, options) {
        var self = this,
        arg;

        this.cards = [];

        // clone default options
        this.options = JSON.parse(JSON.stringify(Deck.defaultOptions));

        for (var i = arguments.length - 1; i >= 0; i--) {
            arg = arguments[i];

            if (arg instanceof Card) {
                this.cards.push(arg);
            }
            else if (arg instanceof Deck) {
                this.push(arg);
            }
            else if (arg instanceof Array) {
                this.cards = this.cards.concat(arg);
            }
            else if (typeof arg == 'object') {
                // assume options
                Object.keys(this.options).map(function(key) {
                    if (arg.hasOwnProperty(key)) {
                        self.options[key] = arg[key];
                    }
                });
            }
        }

        this.mapCards();

        this.__defineGetter__('length', this.count);
    };

    Deck.defaultOptions = {
        allowDuplicates: false
    };

    Deck.prototype.mapCards = function() {
        var self = this;

        this.cards.forEach(function(card) {
            card.deck = self;
        });

        return this;
    }

    Deck.prototype.count = function() {
        return this.cards.length;
    }

    Deck.prototype.deal = function(cards, hands) {
        var i,
            total = cards * hands,
            decks = [];
        if (this.cards.length < total) {
            throw new RangeError('Not enough cards in deck.');
        }

        for (i = 0; i < total; i++) {
            if (!decks[i % hands]) {
                decks[i % hands] = new Deck;
            }

            decks[i % hands].push(this.pop());
        }

        return decks.map(function(deck) {
            return new Deck(deck);
        });
    };

    Deck.prototype.pop = function(cards) {
        if (typeof cards == 'undefined') {
            cards = 1;
        }

        if (this.cards.length < cards) {
            throw new RangeError('Not enough cards in deck.');
        }

        return new Deck(this.cards.splice(-cards));
    };

    Deck.prototype.push = function(cards) {
        if ((cards instanceof Card) || (cards instanceof Array)) {
            cards = new Deck(cards);
        }

        if (!(cards instanceof Deck)) {
            throw new TypeError('Expected object of type Deck, "' + (typeof cards) + '" provided.');
        }

        if (!this.canAdd(cards)) {
            throw new RangeError('Operation would result in duplicate cards in deck, which is disallowed by the current options.');
        }

        this.cards = this.cards.concat(cards.empty().cards);
        this.mapCards();

        return this;
    };

    Deck.prototype.shift = function(cards) {
        if (typeof cards == 'undefined') {
            cards = 1;
        }

        return new Deck(this.cards.splice(0, cards));

        return this;
    };

    Deck.prototype.unshift = function(cards) {
        if (cards instanceof Card) {
            cards = new Deck(cards);
        }

        if (!(cards instanceof Deck)) {
            throw new TypeError('Expected object of type Deck, "' + (typeof cards) + '" provided.');
        }

        if (!this.canAdd(cards)) {
            throw new RangeError('Operation would result in duplicate cards in deck, which is disallowed by the current options.');
        }

        this.cards = cards.empty().cards.concat(this.cards);
        this.mapCards();

        return this;
    };

    Deck.prototype.shuffle = function() {
        var shuffled = [];

        while (this.cards.length) {
            shuffled.push(this.cards.splice(Math.floor(this.cards.length * Math.random()), 1).pop());
        }

        this.cards = shuffled;

        return this;
    };

    Deck.prototype.empty = function() {
        return new Deck(this.cards.splice(0));
    };

    Deck.prototype.toString = function() {
        return this.cards.map(function(card) {
            return card.toString()
        }).join(',');
    };

    Deck.prototype.valueOf = function() {
        return this.cards;
    }

    Deck.prototype.includes = function(deck) {
        var self = this;

        if (deck instanceof Card) {
            deck = new Deck(deck);
        }

        if (!(deck instanceof Deck)) {
            throw new TypeError('Expected object of type Deck, "' + (typeof deck) + '" provided.');
        }

        return new Deck(deck.cards.filter(function(card) {
            return self.has(card) === true;
        }));
    };

    Deck.prototype.has = function(card) {
        var cardId;

        if (!(card instanceof Card)) {
            card = new Card(card);
        }

        cardId = card.id;

        return !!this.cards.some(function(card) {
            return card.id == cardId;
        });
    };

    Deck.prototype.canAdd = function(deck) {
        var self = this,
            includes;

        if (deck instanceof Card) {
            deck = new Deck(deck);
        }

        if (!(deck instanceof Deck)) {
            throw new TypeError('Expected object of type Deck, "' + (typeof deck) + '" provided.');
        }

        includes = this.includes(deck);

        if (includes.length && !this.options.allowDuplicates) {
            return false;
        }
        else if (includes.length && (this.options.allowDuplicates instanceof Array)) {
            return includes.cards.filter(function(card) {
                return self.options.allowDuplicates.map(function(card) {
                    return new Card(card).id;
                }).includes(new Card(card).id);
            }).length == includes.length;
        }

        return true;
    };

    Deck.prototype.sort = function(arg) {
        this.cards.sort(arg);

        return this;
    };

    Deck.prototype.top = function() {
        return this.peek(1)[0];
    };

    Deck.prototype.bottom = function() {
        return this.peek(0)[0];
    };

    Deck.prototype.peek = function(n) {
        return n ? this.cards.slice(-n) : this.cards;
    };

    Deck.prototype.after = function(card) {
        return this.cards[this.cards.indexOf(card) + 1];
    };

    Deck.prototype.before = function(card) {
        return this.cards[this.cards.indexOf(card) - 1];
    };

    Deck.prototype.remove = function(cardToRemove) {
        cardToRemove = this.cards.filter(function(card) {
            return card.id == cardToRemove.id;
        })[0];
        this.cards = this.cards.filter(function(card) {
            return card.id != cardToRemove.id;
        });

        return cardToRemove;
    }

    return Deck;
})();

