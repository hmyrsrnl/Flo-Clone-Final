<script setup lang="ts">
const orderStore = useOrderStore()
const authStore = useAuthStore()

onMounted(async () => {
    if (authStore.user) {
        await orderStore.fetchUserOrders()
    } else {
        navigateTo('/login')
    }
})
</script><template>
    <div class="orders-page container">
        <h1 class="page-title">Siparişlerim</h1>

        <div v-if="orderStore.loading" class="loading-state">Yükleniyor...</div>

        <div v-else-if="orderStore.userOrders.length > 0" class="orders-list">
            <div v-for="order in orderStore.userOrders" :key="order.id" class="order-card-wrapper">
                <div class="flo-order-card">
                    <div class="item-preview" v-if="order.items && order.items.length > 0">
                        <img :src="order.items[0].imageUrl || order.items[0].image" class="thumb" />
                        <span class="count-badge" v-if="order.items.length > 1">{{ order.items.length }}</span>
                    </div>

                    <div class="order-info">
                        <p class="order-date">
                            {{ order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleString('tr-TR') : 'Yeni Sipariş' }}
                        </p>
                        <p class="order-number">Sipariş No: <strong>{{ order.id.toUpperCase().slice(0, 10) }}</strong></p>
                    </div>

                    <div class="order-status">
                        <span class="status-green">{{ order.items?.length }} Ürün {{ order.status || 'Teslim Edildi' }}</span>
                    </div>

                    <div class="order-final">
                        <div class="price-section">
                            <span class="price-value">{{ order.totalPrice || 0 }} TL</span>
                            <span class="payment-method">Kredi/Banka Kartı</span>
                        </div>
                        <div class="detail-arrow">
                            <span class="arrow-icon">></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="empty-state">Henüz bir siparişiniz bulunmuyor.</div>
    </div>
</template>

<style scoped>
.flo-order-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 18px 25px;
    margin-bottom: 12px;
    transition: border-color 0.3s;
}

.flo-order-card:hover {
    border-color: #ff6000;
}

.item-preview {
    position: relative;
    width: 60px;
    height: 60px;
}

.thumb {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 1px solid #eee;
    border-radius: 6px;
}

.count-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #eee;
    color: #333;
    font-size: 10px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.order-info .order-date {
    color: #999;
    font-size: 13px;
    margin: 0;
}

.order-info .order-number {
    color: #333;
    font-size: 14px;
    margin: 4px 0 0;
}

.status-green {
    color: #009900;
    font-weight: 600;
    font-size: 14px;
}

.price-section {
    text-align: right;
    margin-right: 15px;
}

.price-value {
    display: block;
    color: #ff6000;
    font-size: 18px;
    font-weight: 700;
}

.payment-method {
    color: #999;
    font-size: 11px;
}

.detail-arrow {
    width: 32px;
    height: 32px;
    background: #ff6000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-icon {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
}
</style>