<template>
    <slot></slot>

    <div v-if="reservationMode === 'reservationRequired'">Les réservations sont obligatoires.</div>
    <div v-else-if="reservationMode === 'eveningReservationRequired'">Les réservations sont obligatoires le soir.</div>
    <div v-else>Il n'est pas nécessaire de réserver pour venir manger.</div>
    <br/>
    
    <!-- Choix partie menu -->
    <input :ref="partMenu[0].id" :id="partMenu[0].id" name="menuPart" @click="changeMenuPart()" type="radio" checked>
    <label :for="partMenu[0].id" :style="{ 'color': partMenu[0].color}">{{ partMenu[0].name }}</label>

    <input :ref="partMenu[1].id" :id="partMenu[1].id" name="menuPart" @click="changeMenuPart()" type="radio">
    <label :for="partMenu[1].id" :style="{ 'color': partMenu[1].color}">{{ partMenu[1].name }}</label>
    
    <input :ref="partMenu[2].id" :id="partMenu[2].id" name="menuPart" @click="changeMenuPart()" type="radio">
    <label :for="partMenu[2].id" :style="{ 'color': partMenu[2].color}">{{ partMenu[2].name }}</label>
 
    <ul>
        <!-- Choix entrée -->
        <li v-show="showStarterPartChoice" v-for="starterItem in starter" :key="starterItem.id">
            <input v-model="selectedStarterId" name="starterChoice" :value="starterItem.id" type="radio">
            {{ starterItem.name }} : {{ starterItem.cost }}€
        </li>
        <!-- Choix plat -->
        <li v-show="showMainCoursePartChoice" v-for="mainCourseItem in mainCourse" :key="mainCourseItem.id">
            <input v-model="selectedMainCourseId" name="mainCourse" :value="mainCourseItem.id" type="radio">
            {{ mainCourseItem.name }} : {{ mainCourseItem.cost }}€
        </li>
        <!-- Choix dessert -->
        <li v-show="showDessertPartChoice" v-for="dessertItem in dessert" :key="dessertItem.id">
            <input v-model="selectedDessertId" name="dessert" :value="dessertItem.id" type="radio">
            {{ dessertItem.name }} : {{ dessertItem.cost }}€
        </li>
    </ul>

    <p v-if="onSale">Super c'est dimanche, vous avez une réduction de {{ discount }}% sur votre commande !</p>

    <p>Total : {{ total }}€</p>

    <button @click="emitReservation">Réserver</button>
</template>

<script>
export default {
    emits: ['set-reservation-number'],
    props: {
        reservationMode: {type: String, required: true},
        menuNumber: {type: Number, default: 1}
    },
    data() {
        return {
            reservationNumber: 0,
            onSale: false,
            discount: 10,
            showStarterPartChoice: true,
            showMainCoursePartChoice: false,
            showDessertPartChoice: false,
            partMenu: [
                { id: 'starterPart', name: 'Entrée', color: 'blue'},
                { id: 'mainCoursePart', name: 'Plat', color: 'red'},
                { id: 'dessertPart', name: 'Dessert', color: 'green'}
            ],
            starter: [
                { id: 1, name: 'Salade mozza', cost: 1},
                { id: 2, name: 'Salade avocat', cost: 2},
                { id: 3, name: 'Salade saumon fumé', cost: 3}
            ],
            mainCourse: [
                { id: 1, name: 'Pâtes pesto', cost: 4},
                { id: 2, name: 'Pâtes carbo', cost: 5},
                { id: 3, name: 'Pâtes au saumon', cost: 6}
            ],
            dessert: [
                { id: 1, name: 'Tiramisu', cost: 7},
                { id: 2, name: 'Banana split', cost: 8},
                { id: 3, name: 'Salade de fruit', cost: 9}
            ],
            selectedStarterId: null,
            selectedMainCourseId: null,
            selectedDessertId: null
        } 
    },
    //avant que le composant ne soit rendu sur la page
    beforeMount() {
		const now = new Date();
        const day = now.getUTCDay();

		if (day === 0) {//0 : dimanche
			this.onSale = true;//solde le dimanche
		}
	},
    methods: {
        /**
         * Définit quelle partie du menu afficher
         */
        changeMenuPart() {
            this.showStarterPartChoice = (this.$refs.starterPart.checked) ? true : false;
            this.showMainCoursePartChoice = (this.$refs.mainCoursePart.checked) ? true : false;
            this.showDessertPartChoice = (this.$refs.dessertPart.checked) ? true : false;
        },
        /**
         * Envoi le nombre de réservations au composant parent
         */
        emitReservation() {
            if (this.selectedStarterId && this.selectedMainCourseId && this.selectedDessertId) {
                this.reservationNumber += 1;
                //emit : émission d'un évènement personnalisé
                this.$emit('set-reservation-number', { reservationNumber: this.reservationNumber })
            } else {
                alert("Veuillez d'abord choisir l'entrée, le plat et le dessert.")
            }
        }
    },
    watch: {
        /**
         * S'exécute quand la valeur de isAllMenuCompleted change
         */
        isAllMenuCompleted(newValue, oldValue) {
            alert(`Votre menu est complété vous pouvez réserver`);
        }
    },
    computed: {
        /**
         * Calcule le total à payer selon les plats du menu choisis.
         * 
         * Rque : this.total est mis à jour quand la valeur d'un this.data dans la fonction change
         */
        total() {
            let total = 0;
            let starterChoice = this.starter.find(element => element.id === this.selectedStarterId);
            let mainCourseChoice = this.mainCourse.find(element => element.id === this.selectedMainCourseId);
            let dessertChoice = this.dessert.find(element => element.id === this.selectedDessertId);

            if (starterChoice) {
                total += starterChoice.cost;
            }
            if (mainCourseChoice) {
                total += mainCourseChoice.cost;
            }
            if (dessertChoice) {
                total += dessertChoice.cost;
            }

            //réduction de 10%
            if (this.onSale) {
                total = total - (total * (this.discount / 100));
            }

            return total.toFixed(2);
        },
        /**
         * Vérifie si tous les plats du menu ont été sélectionnés
         */
        isAllMenuCompleted() {
            return (this.selectedStarterId !== null && this.selectedMainCourseId !== null && this.selectedDessertId !== null);
        }
    }
}
</script>