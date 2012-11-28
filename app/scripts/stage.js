define(['jquery', 'molecule', 'utilities'], function($, Molecule, Utilities) {

    var Stage = function($el){
        this.molecules = [];
        this.$stage = $el;
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
        mol.pos.x = Utilities.randomIntInRange(0, this.$stage.width()-mol.circ);
        mol.pos.y = Utilities.randomIntInRange(0, this.$stage.height()-mol.circ);
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

    return Stage;

});