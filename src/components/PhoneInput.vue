<template>
    <div class="text-field">
        <label :for="id" class="text-field__label">{{ label }}</label>
        <input type="tel"
               v-mask="{mask: '+7 (999) 999-99-99', showMaskOnHover: false, showMaskOnFocus: false}"
               :name="id"
               :id="id"
               autocomplete="off"
               spellcheck="false"
               :disabled="disabled"
               ref="input"
               :class="['text-field__input', {'error': (isDirty || validation) && !isValid}]"
               @input="updateValue($event.target.value)"
               @blur="blurField()"/>
        <transition name="fade">
            <p v-if="(isBlurred || validation) && !isValid"
               class="text-field__message error">
                Введите номер телефона
            </p>
        </transition>
    </div>
</template>

<script>
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
            }
        },

        data: () => ({
            id: generateRandomId(),

            inputValue: '',

            isDirty: false,
            isValid: false,
            isBlurred: false
        }),

        methods: {
            updateValue (newValue) {
                this.isDirty = true

                this.inputValue = newValue.replace(/[^+\d]/g, '')
                this.isValid = this.inputValue.length === 12

                if (this.isValid) {
                    this.$emit('input', this.inputValue)
                } else {
                    this.$emit('input', null)
                }
            },

            blurField () {
                this.isBlurred = this.isDirty
            },

            reset () {
                this.$refs.input.value = ''
                Object.assign(this.$data, this.$options.data.apply(this))
            }
        }
    }
</script>
