<template>
    <div class="text-field">
        <label :for="id" class="text-field__label">{{ label }}</label>
        <datepicker :language="ru"
                    v-model="inputValue"
                    :monday-first="true"
                    ref="input"
                    :full-month-name="true"
                    :input-class="{'text-field__input': true, 'error': validation && !inputValue}"
                    :calendar-button="true"
                    :calendar-button-icon="'icon-calendar'"
                    :disabled-dates="{to: disabledTo, from: disabledFrom}"
                    @selected="updateValue"/>
        <transition name="fade">
            <p v-if="validation && !inputValue"
               class="text-field__message error">
                Укажите необходимую дату
            </p>
        </transition>
        <span class="icon-calendar"></span>
    </div>
</template>

<script>
    import {ru} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker'

    import {generateRandomId} from 'utils/misc'

    export default {
        props: {
            label: {
                type: String
            },

            validation: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            },

            disabledTo: {
                type: Date
            },

            disabledFrom: {
                type: Date
            }
        },

        components: {
            Datepicker
        },

        data: () => ({
            id: generateRandomId(),

            inputValue: '',

            ru
        }),

        methods: {
            updateValue (newValue) {
                if (newValue) {
                    this.$emit('input', newValue)
                } else {
                    this.$emit('input', null)
                }
            },

            reset () {
                Object.assign(this.$data, this.$options.data.apply(this))
            }
        }
    }
</script>
