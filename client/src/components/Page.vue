<template>
  <div>
    <div class="container">
      <form @submit.prevent="checkForm()">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <span v-for="(error, index) in errors" :key="index" class="input-error">
              {{ error }}
          </span>
        </p>
        <label>
          Email To
          <input
            type="text"
            v-model="email"/>
        </label>
        <br/><br/>
        <label>
          Email Cc
          <input
            type="text"
            v-model="emailCc"/>
        </label>
        <br/><br/>
        <label>
          Email Bcc
          <input
            type="text"
            v-model="emailBcc"/>
        </label>
        <br/><br/>
        <label>
          Subject
          <input
            type="text"
            v-model="subject"/>
        </label>
        <br/><br/>
        <label>
          Body
          <textarea
            cols="30" rows="5"
            v-model="content"/>
        </label>
        <br/><br/>
        <div v-if="errorMessage" class="input-wrapper">
          <span class="input-error">{{errorMessage}}</span>
        </div>
        <div v-if="successMessage" class="input-wrapper">
          <span class="input-success">{{successMessage}}</span>
        </div>
        <div class="input-wrapper">
          <button class="save active" type="submit">
            Send Email
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import emailService from './../services/EmailService'
export default {
  name: 'Page',
  data () {
    return {
      email: '',
      emailCc: '',
      emailBcc: '',
      subject: '',
      content: '',
      errorMessage: '',
      successMessage: '',
      errors: []
    }
  },
  methods: {
    async checkForm (e) {
      this.errors = []
      if (!this.email) {
        this.errors.push('Email To required')
      }
      if (!this.subject) {
        this.errors.push('Subject required')
      }
      if (!this.content) {
        this.errors.push('Email Body required')
      }

      if (this.errors.length < 1) {
        this.sendEmail()
      }
    },
    async sendEmail () {
      const self = this
      self.loading = true
      self.errorMessage = ''
      self.successMessage = ''
      try {
        const emailPayload = {
          email: self.email,
          emailCc: self.emailCc,
          emailBcc: self.emailBcc,
          subject: self.subject,
          content: self.content
        }
        const response = await emailService.sendEmail('/v1/mail', emailPayload)
        const {status} = response
        if (status && status !== 200) {
          const {message} = await response.json()
          self.errorMessage = message
        }
        self.successMessage = 'Email sent successfully'
        this.resetForm()
      } catch (error) {
        if (error && error.response && error.response.status && error.response.status === 400) {
          self.errorMessage = JSON.parse(error.response.data).message
        } else {
          self.$router.push('/error')
        }
      }
    },
    resetForm () {
      const self = this
      self.email = ''
      self.emailCc = ''
      self.emailBcc = ''
      self.subject = ''
      self.content = ''
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  margin-top: 16px;
}

.input-error {
  padding-top: 5px;
  display: block;
  color: #C90000;
  font-size: 16px;
}

.input-success {
  padding-top: 5px;
  display: block;
  color: #00C900;
  font-size: 16px;
}
</style>
