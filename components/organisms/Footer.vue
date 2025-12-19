<script setup lang="ts">
/** * Madde 3b: Nuxt 3 otomatik importlar sayesinde script kısmı temizdir.
 * Yazılar ve tasarım eski projenle birebir aynı bırakılmıştır.
 */
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="links-section">
            <div class="links-container">
              <h4>Hakkımızda</h4>
              <div class="links-table">
                <div class="table-row">
                  <div class="table-cell">Kolay İade</div>
                  <div class="table-cell">Kampanyalar</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Müşteri Hizmetleri</div>
                  <div class="table-cell">Mağazalarımız</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">İade ve Değişim</div>
                  <div class="table-cell">Sipariş Takibi</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Güvenli Alışveriş Kılavuzu</div>
                  <div class="table-cell">İşlem Rehberi</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Tıkla Gel Al</div>
                  <div class="table-cell">Kişisel Verilerin Korunması</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Ayakkabı Bakım Rehberi</div>
                  <div class="table-cell">Kurumsal</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Flotomic</div>
                  <div class="table-cell">İnsan Kaynakları</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Blog</div>
                  <div class="table-cell">İletişim</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Mobil Uygulamalar</div>
                  <div class="table-cell">Kullanım Koşulları</div>
                </div>
              </div>
              <div class="cookies-link">
                <span>Çerez Ayarları</span>
              </div>
            </div>
            <div class="app-section">
              <h4>Mobil Uygulamalar</h4>
              <div class="app-downloads">
                <a href="https://play.google.com/store/search?q=flo" target="_blank" class="app-button">
                  <div class="app-icon"><i class="fab fa-google-play"></i></div>
                  <div class="app-text"><div class="app-store">Google Play</div></div>
                </a>
                <a href="https://apps.apple.com/us/app/flo-ayakkabi" target="_blank" class="app-button">
                  <div class="app-icon"><i class="fab fa-apple"></i></div>
                  <div class="app-text"><div class="app-store">App Store</div></div>
                </a>
                <a href="#" target="_blank" class="app-button">
                  <div class="app-icon"><i class="fas fa-shopping-bag"></i></div>
                  <div class="app-text"><div class="app-store">AppGallery</div></div>
                </a>
              </div>
            </div>
          </div>

          <div class="middle-section">
            <div class="social-section">
              <h4>Takip Edin</h4>
              <div class="social-links">
                <a href="https://www.facebook.com/floayakkabi" target="_blank" class="social-item">
                  <i class="fab fa-facebook-f"></i>
                  <span>Flo Facebook</span>
                </a>
                <a href="https://x.com/floayakkabi" target="_blank" class="social-item">
                  <i class="fab fa-twitter"></i>
                  <span>Flo X</span>
                </a>
                <a href="https://tr.pinterest.com/flomagazacilik/" target="_blank" class="social-item">
                  <i class="fab fa-pinterest-p"></i>
                  <span>Flo Pinterest</span>
                </a>
                <a href="https://www.instagram.com/floayakkabi/" target="_blank" class="social-item">
                  <i class="fab fa-instagram"></i>
                  <span>Flo Instagram</span>
                </a>
                <a href="https://www.youtube.com/user/floayakkabi" target="_blank" class="social-item">
                  <i class="fab fa-youtube"></i>
                  <span>Flo Youtube</span>
                </a>
              </div>
            </div>
          </div>

          <div class="info-section">
            <div class="info-card">
              <div class="info-icon"><i class="fas fa-store"></i></div>
              <div class="info-content">
                <h4>FLO Pazaryeri</h4>
                <p>Binlerce ürün yelpazemizle, müşterilerimize rekabetçi ve uygun fiyatlar sunuyoruz.</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon"><i class="fas fa-undo-alt"></i></div>
              <div class="info-content">
                <h4>Kolay İade</h4>
                <p>flo.com.tr'den almış olduğunuz ve hiç kullanmadığınız ürünleri iade süresi içinde iade edebilirsiniz.</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon"><i class="fas fa-shipping-fast"></i></div>
              <div class="info-content">
                <h4>Kargo Bedava</h4>
                <p>FLO satıcısına özel 300 TL ve üzeri alışverişlerinizde ve satıcılarımızın farklı sepet tutarlarına göre KARGO BEDAVA.</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon"><i class="fas fa-headset"></i></div>
              <div class="info-content">
                <h4>Çağrı Merkezi</h4>
                <p>Müşteri hizmetlerimiz çağrılarınıza haftanın 7 günü 08.00 - 22.00 saatleri arasında hizmet vermektedir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <p>© {{ currentYear }} FLO.COM.TR. TÜM HAKLARI SAKLIDIR.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f8f8f8;
  font-family: Arial, Helvetica, sans-serif;
  border-top: 1px solid #eee;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-footer {
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 60px;
  align-items: start;
}

.links-section h4 {
  color: #000;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
}

.links-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
  padding: 8px 20px 8px 0;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.3s;
  border-bottom: 1px solid #eee;
  line-height: 1.4;
}

.table-cell:hover {
  color: #FF6600;
}

.cookies-link {
  margin: 15px 0 30px 0;
}

.cookies-link span {
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.3s;
}

.cookies-link:hover span {
  color: #FF6600;
}

.middle-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.app-section h4,
.social-section h4 {
  color: #000;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: bold;
}

.app-downloads {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}

.app-button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 50px;
  width: 140px;
  text-decoration: none;
  color: inherit;
}

.app-button:hover {
  background: #f5f5f5;
  border-color: #ccc;
  text-decoration: none;
  color: inherit;
}

.app-icon {
  margin-right: 10px;
  font-size: 20px;
  color: #333;
}

.app-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.app-store {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.app-subtitle {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-item {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.3s;
  padding: 8px 0;
  line-height: 1.4;
  text-decoration: none;
}

.social-item i {
  margin-right: 8px;
  font-size: 14px;
  width: 16px;
  text-align: center;
}

.social-item:hover {
  color: #FF6600;
  text-decoration: none;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.info-card:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-icon {
  margin-right: 15px;
  font-size: 20px;
  color: #666;
  min-width: 24px;
}

.info-content h4 {
  color: #000;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
  line-height: 1.3;
}

.info-content p {
  color: #666;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
}

.copyright {
  color: #FF6600;
  padding: 15px 0;
  text-align: center;
  border-top: 1px solid #eee;
}

.copyright p {
  color: #999;
  font-size: 11px;
  margin: 0;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .info-section {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .info-card {
    border-bottom: none;
    padding-bottom: 0;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .info-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .links-table {
    display: block;
  }
  
  .table-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 8px 0;
  }
  
  .table-cell {
    display: block;
    padding: 0;
    border: none;
  }
  
  .app-downloads {
    flex-direction: column;
    flex-wrap: wrap;
   
  }
  
  .social-links {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .middle-section {
    align-items: center;
    text-align: center;
  }
}
</style>