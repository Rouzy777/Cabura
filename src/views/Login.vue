<template>
    <div class='min-vh-100 d-flex'>
        <div class='col-lg-4 col-md-6 col-10 text-center m-auto p-4 bg-white rounded'>
            <h4>Вход</h4>
            <input
                class='form-control mt-3'
                :class='{"border-danger": ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}'
                v-model.trim='email'
                placeholder="Email">
            <input
                type="password"
                v-model='password'
                :class='{"border-danger": ($v.password.$dirty && !$v.password.required)}'
                class='form-control mt-2'
                placeholder="Пароль">
            <button @click='submit' class='btn btn-success col-12 mt-3' name="button">Войти</button>
            <p class='mt-3'>
                Нет аккаунта?
                <router-link class='text-primary' to="/signup">
                    Регистрация
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
    data() {
        return {
            email: '',
            password: ''
        }
    },
    validations: {
        email: {
            email, required
        },
        password: {
            required
        }
    },
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            console.log(fbError);
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
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push('/')
            } catch(e) {
                // continue regardless of error
            }
        }
    }
}
</script>
