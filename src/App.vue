<template>
    <div class="page-container">
        <div class="row">
            <div class="booking col-md-6">
                <div class="booking__header">
                    <h1 class="booking__title">Найдите лучшие предложения</h1>
                    <small class="booking__subtitle">От уютных загородных домов до стильных городских квартир</small>
                </div>
                <form @submit.prevent="handleSubmitForm" class="booking__form">
                    <div class="row">
                        <div class="col-sm-6">
                            <date-input v-model="dateFrom"
                                        label="Дата заезда"
                                        ref="dateFrom"
                                        :validation="state === 'VALIDATION' && dateFrom === null"
                                        :disabledFrom="dateTo"
                                        :disabledTo="getTodayDate()"/>
                        </div>
                        <div class="col-sm-6">
                            <date-input v-model="dateTo"
                                        ref="dateTo"
                                        :validation="state === 'VALIDATION' && dateTo === null"
                                        :disabledTo="dateFrom"
                                        label="Дата выезда"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <phone-input v-model="phone"
                                         ref="phone"
                                         :validation="state === 'VALIDATION' && phone === null"
                                         label="Номер телефона"/>
                        </div>
                        <div class="col-sm-6">
                            <fio-input v-model="name"
                                       ref="name"
                                       :validation="state === 'VALIDATION' && name === null"
                                       label="Имя"/>
                        </div>
                    </div>
                    <button class="button">Забронировать</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueNotifications from 'vue-notifications'

    import DateInput from 'components/DateInput.vue'
    import PhoneInput from 'components/PhoneInput.vue'
    import FioInput from 'components/FioInput.vue'

    import {formatDate} from 'utils/format'

    export default {
        components: {
            DateInput,
            PhoneInput,
            FioInput,
            VueNotifications
        },

        data: () => ({
            dateFrom: null,
            dateTo: null,
            phone: null,
            name: null,

            state: 'FILL' // FILL, LOADING
        }),

        methods: {
            getTodayDate () {
                let date = new Date()
                date.setDate(date.getDate() - 1)
                return date
            },

            handleSubmitForm () {
                const {dateFrom, dateTo, phone, name} = this

                if (dateFrom !== null && dateTo !== null && phone !== null && name !== null) {
                    let requestData = {
                        site_id: 100,
                        type: 'order',
                        data: [
                            {name: 'Имя', value: name},
                            {name: 'Дата заезда', value: formatDate(dateTo)},
                            {name: 'Дата выезда', value: formatDate(dateFrom)},
                            {name: 'Телефон', value: phone}
                        ]
                    }

                    axios.post('/siteLead', requestData).then(response => {
                        this.dateFrom = null
                        this.$refs.dateFrom.reset()
                        this.dateTo = null
                        this.$refs.dateTo.reset()
                        this.phone = null
                        this.$refs.phone.reset()
                        this.name = null
                        this.$refs.name.reset()
                        this.state = 'FILL'

                        let id = response.data.match(/=(.*)$/)[1]
                        VueNotifications.success({
                            id: 'order',
                            message: `Заявка #${id} успешно зарегистрирована`
                        })
                    }).catch(() => {
                        VueNotifications.error({
                            id: 'order',
                            message: 'Что-то пошло не так'
                        })
                    })
                } else {
                    this.state = 'VALIDATION'
                }
            }
        }
    }
</script>
