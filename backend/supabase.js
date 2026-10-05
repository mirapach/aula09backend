require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Variáveis do ambiente do arquivo .env
const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

// Alerta visual
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('seu-projeto')){
    console.log('\n Atenção: não configurado .env');
    console.log('Abra o arquivo backend/ .env \n');
} 

const supabase = createClient(supabaseUrl || '', supabaseKey || '');
module.exports = supabase;