// /config/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name:"dnddamsgs",
  api_key: 518447678611573,
  api_secret:"QiGWd0Dv_tTuRd_Nt8rE6wi7FBA",
});

export default cloudinary;
