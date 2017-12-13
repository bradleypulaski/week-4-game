function status() {
    this.name;
    this.description;
    this.type;
    this.turns;
}

function lrng() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}
function golem() {
    this.id;
    this.maximumhealth = 100;
    this.health = 100;
    this.magic = 30;
    this.armor = 800;
    this.type = "earth";
    this.weaknesses = ["water"];
    this.dead = 0;
    this.status = {};
    this.addStatus = function (status) {
        this.status[status.name] = status;
        this.abilities.status = this.status;
    }
    this.removeStatus = function (statusname) {
        var has = this.hasStatus(statusname);
        if (has)
            delete this.status[statusname];
        this.abilities.status = this.status;
    }
    this.hasStatus = function (statusname) {
        var has = false;
        if (this.status.hasOwnProperty(statusname)) {
            has = true;
        }
        return has;
    }
    this.getStatusTurns = function (statusname) {
        var has = this.hasStatus(statusname);
        var turns = 0;
        if (has) {
            turns = this.status[statusname].turns;
        }
        return turns;
    }
    this.takeSoulDamage = function (element, damage) {
        return false;
    }
    this.takeDamage = function (element, damage) {
        if (this.status.hasOwnProperty('panic')) {
            damage = Math.floor(damage * 1.33333);
        }
        if (this.weaknesses.indexOf(element) !== -1) {
            damage = Math.floor(damage * 1.5);
        }
        if (this.armor > 0) {
            this.armor -= damage;
            if (this.armor < 0) {
                this.health += this.armor;
                this.armor = 0;
            }
        } else {
            this.health -= damage;
        }
                if (this.health <= 0) {
            this.health = 0;
            this.dead = 1;
        }
    }

    this.abilities = {
        "rockslide": function (target) {
            
            if (this.status.hasOwnProperty('illusion')) {
                var irng = arng(0, 100);
                if (irng < 51) {
                    return true
                }
            }
            var rng = lrng();
            while (rng > 0) {
                var damage = 15;
                if (this.status.hasOwnProperty('slow')) {
                    damage = Math.floor(damage * .66666);
                }
                target.takeDamage("earth", damage);
                rng -= 19;
            }
        },
        "stonearmor": function (target) {
            
            if (this.status.hasOwnProperty('illusion')) {
                var irng = arng(0, 100);
                if (irng < 51) {
                    return true
                }
            }
            if (this.parent.magic < 10) {
                return false;
            }
            this.parent.magic -= 10;

            target.armor += 500;
        },
        "explode": function (party) {
            
            if (this.status.hasOwnProperty('illusion')) {
                var irng = arng(0, 100);
                if (irng < 51) {
                    return true
                }
            }
            if (this.parent.magic < 20) {
                return false;
            }
            this.parent.magic -= 20;
            var rng = lrng();
            var damage = rng * 5;
            var key;
            for (key in party) {
                party[key].takeDamage("earth", damage);
            }
            this.parent.dead = 1;
            this.parent.health = 0;
        }
    }
    this.abilities.status = this.status;
    this.abilities.parent = this;
}
 