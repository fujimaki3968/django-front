<template>
    <v-container>
        <v-alert type="error" v-if="errorMessage">
            {{errorMessage}}
        </v-alert>
        <v-form v-model="valid">
            <v-text-field
                    v-model="username"
                    label="ユーザー名"
                    :rules="usernameRules"
                    required></v-text-field>
            <v-text-field
                    v-model="password"
                    label="パスワード"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (showPassword = !showPassword)"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    required></v-text-field>
            <v-btn :disabled="!valid" @click="submit">ログイン</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                valid: false,
                username: null,
                password: null,
                showPassword: false,
                errorMessage: null,
                usernameRules: [
                    v => !!v || 'ログインIDを入力してください',
                ],
                passwordRules: [
                    v => !!v || 'パスワードを入力してください',
                ],
            }
        },
        methods: {
            ...mapActions(['login']),
            submit() {
                this.login([this.username, this.password]).then(res => {
                    console.log(res);
                    this.$router.push('/')
                }, err => {
                    console.log(err);
                    this.errorMessage = "ログインに失敗しました。"
                })
            },
        },
    }
</script>