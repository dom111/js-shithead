var NoCard = new Card({
    id: '',
    value: 0
});

var Shithead = function(args) {
    var self = this;
    this.players = [];

    // exclude items by id
    this.exclude = args.exclude || [];
    this.specials = [
        {
            cards: ['2C', '2D', '2H', '2S'],
            name: 'Reset',
            value: 14,
            check: function(game, player, card, played) {
                return true;
            }
        },
        {
            cards: ['4C', '4D', '4H', '4S'],
            name: 'See through',
            value: 18,
            check: function(game, player, card, played) {
                return game.beats(game.discard.before(card), played);
            }
        },
        // {
        //     cards: ['7C', '7D', '7H', '7S'],
        //     name: 'Lower than 7',
        //     value: 7,
        //     check: function(game, player, card, played) {
        //         // return [2, 3, 4, 5, 6].map(function(n) {
        //         //     return ['C', 'D', 'H', 'S'].map(function(s) {
        //         //         return n + s;
        //         //     });
        //         // }).reduce(function(a, b) {
        //         //     return a.concat(b);
        //         // }).concat(['R']).includes(played.id);
        //         return ['R', '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S'].includes(played.id);
        //     }
        // },
        {
            cards: ['8C', '8D', '8H', '8S'],
            name: 'Miss a go',
            value: 17,
            check: function(game, player, card, played) {
                return game.beats(game.discard.before(card), played);
            },
            action: function(game, player, card, played) {
                return game.turn++;
            }
        },
        {
            cards: ['TC', 'TD', 'TH', 'TS'],
            name: 'Burn the deck',
            value: 21,
            action: function(game, player, card, played) {
                game.burnt.push(game.discard.push(played).empty());
            }
        },
        {
            cards: ['J1', 'J2'],
            name: 'Give them to someone',
            value: 20,
            played: function(game, player, card, played) {
                game.burnt.push(game.discard.remove(card));
            },
            check: function(game, player, card, played) {
                return ['J1', 'J2', 'TC', 'TD', 'TH', 'TS'].includes(played.id);
            },
            action: function(game, player, card, played) {
                var targetPlayer;

                if (player.type == 'Human') {
                    if (game.players.length == 2) {
                        targetPlayer = targetPlayer = game.players.filter(function(otherPlayer) {
                            return otherPlayer.id != player.id;
                        })[0];
                    }

                    while (typeof targetPlayer === 'undefined') {
                        targetPlayer = game.players[prompt('Enter player number to give them to:') - 1];
                    }
                }
                else {
                    targetPlayer = game.players.filter(function(otherPlayer) {
                        return otherPlayer.id != player.id;
                    }).sort(function(a, b) {
                        return (b.hand.length + b.faceUp.length + b.faceDown.length) - (a.hand.length + a.faceUp.length + a.faceDown.length);
                    })[0];
                }

                game.turn += ((targetPlayer.id + (game.players.length * (targetPlayer.id < player.id))) - player.id) - 1;
            }
        }
    ];

    // Aces are high
    if (args.acesHigh || true) {
        Card.Definitions['AC'].value = Card.Definitions['AD'].value = Card.Definitions['AH'].value = Card.Definitions['AS'].value = 15;
    }

    this.turn = 0;
    this.discard = new Deck;
    this.burnt = new Deck;
    this.winner = null;

    this.specials.forEach(function(data) {
        data.cards.forEach(function(cardId) {
            Card.Definitions[cardId].special = data;

            if ('value' in data) {
                Card.Definitions[cardId].value = data.value;
            }
        });
    });

    this.deck = new Deck(Object.keys(Card.Definitions).filter(function(cardId) {
        return !self.exclude.includes(cardId);
    }).map(function(id) {
        return new Card(id);
    }));

    this.deck.shuffle();

    if (!(args.players instanceof Array)) {
        args.players = Array(args.players).fill(1).map(function() {
            return {
                type: 'AI'
            };
        });
    }

    for (var i = 0; i < args.players.length; i++) {
        this.players.push(new Shithead.Player(args.players[i], this));
    }

    this.event = new EventEmitter();
};

Shithead.prototype.start = function() {
    var self = this;

    this.deck.deal(3, this.players.length).forEach(function(cards, i) {
        self.players[i].faceDown.push(cards);
    });

    this.deck.deal(3, this.players.length).forEach(function(cards, i) {
        self.players[i].faceUp.push(cards);
    });

    this.deck.deal(3, this.players.length).forEach(function(cards, i) {
        self.players[i].hand.push(cards);
    });

    this.players.forEach(function(player, i) {
        player.swapDeck();
    });

    this.event.on('played', this.play.bind(this));
    this.currentPlayer = this.players[0];
};

Shithead.prototype.play = function(player, played) {
    var self = this,
    toBeat = this.discard.top() || NoCard,
    success;

    if ((!played.peek().every(function(card) {
        // ensure all cards are the same value
        return card.value == played.bottom().value
    })) || (played.length === 0)) {
        alert('Invalid move.');// TODO
        player.hand.push(played);
        player.play();

        return;
    }

    success = played.peek().every(function(card) {
        return self.beats(toBeat, card, true);
    });

    if (toBeat.special && toBeat.special.played) {
        toBeat.special.played(game, player, toBeat, played);
    }

    if (success) {
        played.peek().forEach(function(card) {
            if (card.special) {
                if (card.special.action) {
                    card.special.action(game, player, card, played);
                }
            }

            card.played = game.turn;
            card.player = player;
        });

        this.discard.push(played);

        if ((this.discard.length >= 4) && this.discard.peek(4).map(function(card) {
            return card.value;
        }).every(function(value) {
            return value == self.discard.peek(1)[0].value;
        })) {
            this.burnt.push(this.discard.empty());
        }

        if (player.hand.length < 3) {
            if (this.deck.length) {
                player.hand.push(this.deck.pop(Math.min(3 - player.hand.length, this.deck.length)));
            }
            else {
                if (!player.hand.length) {
                    if (player.faceUp.length) {
                        player.hand.push(player.faceUp.empty());
                    }
                    else if (player.faceDown.length) {
                        player.hand.push(player.faceDown.shuffle().pop());
                    }
                    else {
                        this.winner = player;
                        this.event.emit('game-over', player);
                        _debug(player + ' wins!');
                        _debug('');
                        _debug(' --- ');
                        _debug('');

                        return;
                    }
                }
            }
        }
    }
    else {
        player.hand.push(this.discard.empty()).push(played);
        player.play();

        return;
    }

    setTimeout(function() {
        self.currentPlayer = self.players[++self.turn % self.players.length];
        self.currentPlayer.play();
    }, 200);
};

Shithead.prototype.beats = function(toBeat, toCheck, debug) {
    var toBeat = toBeat || { value: -1 },
    valueToBeat = toBeat.value,
    valueToCheck = toCheck.value;

    if (toBeat.special) {
        if (toBeat.special.check) {
            if (toBeat.special.check(game, null, toBeat, toCheck)) {
                if (debug) {
                    _debug(toCheck + ' beats ' + toBeat);
                }
                return true;
            }
            else {
                if (debug) {
                    _debug(toCheck + ' loses against ' + toBeat);
                }
                return false;
            }
        }
        else if (toCheck.special) {
            if (debug) {
                _debug(toCheck + ' beats ' + toBeat);
            }
            return true;
        }
    }
    else if (toCheck.special) {
        if (debug) {
            _debug(toCheck + ' beats ' + toBeat);
        }
        return true;
    }

    if (valueToBeat <= valueToCheck) {
        if (debug) {
            _debug(toCheck + ' beats ' + toBeat);
        }
        return true;
    }
    else {
        if (debug) {
            _debug(toCheck + ' loses against ' + toBeat);
        }
        return false;
    }
};

Shithead.Player = function(args, game) {
    this.game = game;
    this.id = this.game.players.length;
    this.name = args.name || 'Player ' + (this.game.players.length + 1);
    this.type = args.type;
    this.faceDown = new Deck;
    this.faceUp = new Deck;
    this.hand = new Deck;
    this.player = new Shithead.Player[this.type]({
        player: this
    });
};

Shithead.Player.prototype.toString = function() {
    return this.name + ' - Face down cards: [' + this.faceDown + '], Face up cards: [' + this.faceUp + '], Hand: [' + this.hand + ']';
};

Shithead.Player.prototype.swapDeck = function() {
    this.player.swapDeck();
};

Shithead.Player.prototype.play = function() {
    return this.player.play();
};

// AI routines
Shithead.Player.AI = function(args) {
    this.player = args.player;
};

Shithead.Player.AI.prototype.swapDeck = function() {
    var swapDeck = new Deck(this.player.faceUp, this.player.hand);
    swapDeck.sort(function(a, b) {
        return a.value - b.value;
    });
    this.player.faceUp = swapDeck.pop(3);
    this.player.hand = swapDeck.empty();
    this.player.ready = true;
};

Shithead.Player.AI.prototype.play = function() {
    var self = this,
    toBeat = this.player.game.discard.top() || NoCard,
    valuePlaying = -1,
    playing = new Deck;

    this.player.hand.sort(function(a, b) {
        return a.value - b.value;
    });

    this.player.hand.peek().forEach(function(card) {
        if ((valuePlaying == -1) && (self.player.game.beats(toBeat, card))) {
            valuePlaying = card.value;
        }
    });

    if (valuePlaying == -1) {
        valuePlaying = this.player.hand.bottom().value;
    }

    this.player.hand.peek().filter(function(card) {
        return card.value == valuePlaying;
    }).forEach(function(card) {
        if (valuePlaying > 12 && playing.length) {
            return;
        }

        playing.push(self.player.hand.remove(card));
    });

    this.player.game.event.emit('played', this.player, playing);
};

// Human routines - TODO
Shithead.Player.Human = function(args) {
    this.player = args.player;
};

Shithead.Player.Human.prototype.swapDeck = Shithead.Player.AI.prototype.swapDeck; // TODO

Shithead.Player.Human.prototype.play = function() {
    var self = this;

    this.player.game.event.emit('redraw');

    $(document).on('contextmenu', function(evt) {
        evt.preventDefault();
    });

    $(document).off('touchstart.shithead-select-card mousedown.shithead-select-card').on('touchstart.shithead-select-card mousedown.shithead-select-card', '.player .hand .card', function(evt) {
        if (evt.type !== 'touchstart' && ('ontouchstart' in document || evt.which !== 1)) {
            return;
        }
        else if (evt.type === 'touchstart') {
            if (evt.originalEvent.touches.length > 1) {
                return;
            }
        }

        if (!$(this).hasClass('face-down')) {
            $(this).toggleClass('chosen');
        }
    });

    // choose a card to play
    $(document).off('touchstart.shithead-play-card mousedown.shithead-play-card').on('touchstart.shithead-play-card mousedown.shithead-play-card', function(evt) {
        if (evt.type === 'touchstart') {
            if (evt.originalEvent.touches.length != 2) {
                return;
            }
        }
        else {
            if ('ontouchstart' in document) {
                return;
            }
            else {
                if (evt.which !== 3) {
                    return;
                }
            }
        }

        var playing = new Deck,
        selected = Array.from($('[data-player-id="' + self.player.id + '"] .hand .card.chosen').map(function() {
            return $(this).data('card-id');
        }));

        self.player.hand.peek().filter(function(card) {
            return selected.includes(card.id);
        }).forEach(function(card) {
            playing.push(self.player.hand.remove(card));

            return card;
        });

        $(document).off('touchstart.shithead-play-card mousedown.shithead-play-card');
        self.player.game.event.emit('played', self.player, playing);
    });
};

var _debug = function(s) {
    $('<li>').html(s).appendTo('#debug');
    $('#debug').scrollTop($('#debug').prop('scrollHeight'));
};

$(document).on('touchstart.showDebug', function(evt) {
    if (evt.originalEvent.touches.length >= 4) {
        $('#debug').toggleClass('hidden');
    }
});

$(document).on('keydown', function() {
    $('#debug').toggleClass('hidden');
});
