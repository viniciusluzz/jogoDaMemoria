
let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    technologies: [
        'Aemma Targaryen',
        'Alicent Hightower',
        'Corlys Velaryon',
        'Daemon Targaryen',
        'Laenor Velaryon',
        'Otto Hightower',
        'Rhaenyra Targaryen',
        'Rhaenys Targaryen',
        'Sor Criston Cole',
        'Viserys Targaryen',
    ],

    cards: null,

    createCardsFromTechnologies: function (){
        this.cards = [];
    
        for(let x of this.technologies){
            this.cards.push(this.createPairFromTechnologies(x));
        }
        this.cards = this.cards.flatMap(pair=>pair);

        this.shuffleCards();
        return this.cards;
    },
    
    createPairFromTechnologies: function(x){
    
        return [
            {
                id: this.createIdWithTechnologies(x),
                icon: x,
                flipped: false,
            },
            {
                id: this.createIdWithTechnologies(x),
                icon: x,
                flipped: false,
            }
        ]
    
    },
    
    createIdWithTechnologies: function(x){
        return x + parseInt(Math.random() * 1000)
    },

    shuffleCards: function(){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

    setCard: function(id){

        let card = this.cards.filter(card=> card.id === id)[0];
        console.log(card);

        if (card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkCard: function(){
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflippedCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function(){
        return this.cards.filter(card=>!card.flipped).length == 0;
    },
    

}