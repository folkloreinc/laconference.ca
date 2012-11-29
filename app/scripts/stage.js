define(['jquery', 'molecule', 'utilities'], function($, Molecule, Utilities) {

    var Stage = function($el){
        this.molecules = [];
        this.$stage = $el;
        this.previousWord = '';
        this.nbClicks = 0;
        // determines nb of Users we can show.
        // key = number of clicks, value = numbers of users allowed
        this.maxUsersToShow = { 
            0: 5,
            1: 10,
            3: 15,
            4: 20,
            5: 100
        };
    };

    Stage.prototype.addMolecules = function(molecules) {
        for (var i = 0; i < molecules.length; i++) {
            this.addMolecules(molecules[i]);
        }
    };

    Stage.prototype.addMolecule = function(mol) {
        this.molecules.push(mol);
        this.placeMolecule(mol);
    };

    Stage.prototype.getMolecule = function(index) {
        return this.molecules[index];
    };

    Stage.prototype.getRandomMolecule = function() {
        return this.molecules[Utilities.randomIntInRange(0, this.molecules.length-1)];
    };

    Stage.prototype.placeMolecule = function(mol) {
        mol.updatePosition({
          'x': Utilities.randomIntInRange(0, this.$stage.width()-mol.circ),
          'y': Utilities.randomIntInRange(0, this.$stage.height()-mol.circ)
        });
    };

    Stage.prototype.registerClick = function() {
        this.nbClicks++;
    };

    Stage.prototype.getMaxUsersToShow = function() {
        var maxKey;
        for (var key in this.maxUsersToShow) {
            if(this.nbClicks <= key) {
                return this.maxUsersToShow[key];
            }
            maxKey = key;
        }
        return this.maxUsersToShow[maxKey];
    };

    Stage.prototype.show = function() {
        // Show Molecules
        if(this.molecules) {
            for (var i = 0; i < this.molecules.length; i++) {
                var mol = this.molecules[i];
                mol.show();
            }
        }
    };

    Stage.prototype.searchUser = function(id) {
        for (var i = 0; i < this.molecules.length; i++) {
            var el = this.molecules[i].getElement(id);
            if(el) {
                return el;
            }
        }
    };

    return Stage;

});