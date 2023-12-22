<template>
    <h1>Bienvenue au restaurant {{ restaurantName }}</h1>
    <br/><br/>
    <i>Il y a actuellement {{ reservationNumber }} réservation(s).</i>
    <br/><br/>
    <div>
        <!-- prop reservationMode, emit set-reservation-number -->
        <restaurantMenu :reservationMode="reservationMode" @set-reservation-number="setReservationNumber">
            <h2>Menu n°{{ menuNumber }}</h2><!-- slot content -->
        </restaurantMenu>
        <br/><br/>
        <contact :reservationMode="reservationMode"/>
    </div>
</template>

<script>
import restaurantMenu from "./components/RestaurantMenu.vue";
import contact from "./components/Contact.vue";

export default {
    components: {
        restaurantMenu,
        contact
    },
    data() {
        return {
            restaurantName: 'Mirabelle',
            reservationMode: 'reservationRequired',//reservationRequired ou eveningReservationRequired
            reservationNumber: 0,
            menuNumber: 1
        } 
    },
    methods: {
        /**
         * Met à jour le nombre de réservation
         * @param payload {object}
         */
        setReservationNumber(payload) {
            this.reservationNumber = payload.reservationNumber;
        }
    }
}
</script>


