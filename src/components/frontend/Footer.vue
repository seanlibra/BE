<template>
   <div class="footer_wrapper">
      <div class="container">
        <div class="row">
           <div class="col-3">
            <div class="footer_block">
              <h2>聯絡資訊</h2>
              <ul class="footer_contact_list">
                <li>
                  <span class="material-icons">location_on</span>
                  <div class="footer_contact_item_group">
                    <span>地址:</span>
                    <span>新北市中和區</span>
                  </div>
                </li>
                 <li>
                  <span class="material-icons">phone</span>
                  <div class="footer_contact_item_group">
                    <span>電話:</span>
                    <span>0912-456-789</span>
                  </div>
                </li>
                  <li>
                  <span class="material-icons">email</span>
                  <div class="footer_contact_item_group">
                    <span>電子郵件:</span>
                    <span>contact@support.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
           <div class="col-3">
            <div class="footer_block">
              <h2>最新文章</h2>
            </div>
          </div>
           <div class="col-3">
            <div class="footer_block">
              <h2>商品分類</h2>
            </div>
          </div>
           <div class="col-3">
            <div class="footer_block">
              <h2>快速連結</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
    .footer_wrapper {
     background: #322b2b;
     padding: 50px 0;
     margin-top: 50px;
   }
   .footer_block h2{
     color:#ffffff;
     font-size: 16px;
     padding-left: 10px;
     border-left:3px solid #fe5252;
     line-height: 16px;
     margin-bottom: 50px;
     letter-spacing: 1px;
   }
   .footer_block .material-icons {
     color:#fe5252;
   }
   .footer_contact_list {
     margin: 0;
     padding: 0;
   }
   .footer_contact_list li {
     display: flex;
     align-items: center;
     margin-bottom: 20px;
   }
   .footer_contact_item_group {
     display: flex;
     flex-direction: column;
     margin-left: 10px;
   }
   .footer_contact_item_group span {
     color:#ffffff;
     font-size: 14px;
     letter-spacing: 1px;
   }
</style>
