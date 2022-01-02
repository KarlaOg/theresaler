<template>
  <footer class="footer_area">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Navigate</div>
            <ul class="list-unstyled">
              <router-link to="/"><li>About Us</li></router-link>
              <router-link to="/"><li>Blog</li></router-link>
              <router-link to="/"><li>Sitemap</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Collection</div>
            <ul class="list-unstyled">
              <router-link to="/"><li>New arrivals</li></router-link>
              <router-link to="/"><li>Featured</li></router-link>
              <router-link to="/"><li>Catalog</li></router-link>
              <router-link to="/"><li>Brands</li></router-link>
            </ul>
          </div>
        </div>

        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Catagories</div>
            <ul class="list-unstyled">
              <router-link to="/"><li>Tables</li></router-link>
              <router-link to="/"><li>Lamps</li></router-link>
              <router-link to="/"><li>Chairs</li></router-link>
              <router-link to="/"><li>Sofas</li></router-link>
            </ul>
          </div>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6">
          <div class="tiny-footer">
            <p>Copyright © All Rights Reserved 2021</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer_area {
  position: relative;
  z-index: 1;
  color: #2c3539;
  background-color: #fefefe;
}

.footer-widget {
  padding-top: 60px;
}

.footer-title {
  padding-bottom: 20px;
  font-weight: bold;
}

.list-unstyled a {
  text-decoration: none;
}

.list-unstyled a li {
  color: #2c3e50;
  margin-bottom: 10px;
}

.social-info > img {
  padding-left: 10px;
}

.social-info > img:hover {
  opacity: 0.7;
}
</style>
