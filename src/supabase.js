// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cxekmkjocbmjfuwiufus.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZWtta2pvY2JtamZ1d2l1ZnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5ODU1NjcsImV4cCI6MjA2MzU2MTU2N30.iqduB_14ZSgtSSesb2X4WjKoyhLCKAQAcRzda4G5-T0'


export const initializeStorage = async () => {
  try {
    const { error } = await supabase.storage.createBucket('products', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 1024
    })

    if (error && error.message !== 'Bucket already exists') {
      throw error
    }
  } catch (error) {
    console.error('Storage initialization error:', error)
  }
}






export const supabase = createClient(supabaseUrl, supabaseKey)


