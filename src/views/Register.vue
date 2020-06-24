<template>
    <div class='min-vh-100 d-flex'>
        <div class='col-lg-4 col-md-6 col-10 text-center m-auto p-4 bg-white rounded'>
            <h4>Регистрация</h4>
            <input
                class='form-control mt-3'
                :class='{"border-danger": ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}'
                v-model.trim='email'
                placeholder="Email">
            <input
                class='form-control mt-2'
                :class='{"border-danger": ($v.name.$dirty && !$v.name.required)}'
                v-model='name'
                placeholder="Имя">
            <input
                type="password"
                class='form-control mt-2'
                v-model='password'
                :class='{"border-danger": ($v.password.$dirty && !$v.password.required)}'
                placeholder="Пароль">
            <label class="mt-2">
                <input type="checkbox" v-model='agree'>
                С правилами согласен
            </label>

            <button @click='submit' class='btn btn-success col-12 mt-3' name="button">Зарегистрироваться</button>
            <p class='mt-3'>
                Уже есть аккаунт?
                <router-link class='text-primary' to="/signin">
                    Вход
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import {email, required} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
    name: 'Login',
    data: () => ({
        email: '',
        password: '',
        name: '',
        agree: false
    }),
    validations: {
        email: {
            email, required
        },
        password: {
            required
        },
        name: {
            required
        },
        agree: {
            checked: v => v
        }
    },
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            alert(messages[fbError.code] || "что-то пошло не так");
        }
    },
    methods: {
        async submit() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            try {
                await this.$store.dispatch('register', {
                    email: this.email,
                    password: this.password,
                    name: this.name
                })
                this.$router.push('/')
            } catch(e) {
                // continue regardless of error
            }
        }
    }
}
</script>
