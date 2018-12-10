<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" to="#">Chat Application</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
  $white: #f5f5f5;
  $dark: #2c3e50;
  $lighter: #32465a;
  $lightest: #496886;
  $light: #435f7a;
  $red: #e74c3c;
  $green: #2ecc71;
  $yellow: #f1c40f;
  $gray: #95a5a6;
  $break: 735px;
  $break-big: 900px;
</style>
