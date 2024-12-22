import { supabase } from './client';
import { Database } from './types';

type Product = Database['public']['Tables']['products']['Row'];
type EcoCupon = Database['public']['Tables']['eco_cupons']['Row'];

export async function getProducts(search?: string) {
  let query = supabase
    .from('products')
    .select('*')
    .order('name');

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
}

export async function createEcoCupon(productId: number) {
  const code = generateCuponCode(productId);
  
  const { data, error } = await supabase
    .from('eco_cupons')
    .insert([
      {
        code,
        product_id: productId,
        status: 'active'
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating eco cupon:', error);
    return null;
  }

  return data as EcoCupon;
}

export async function validateEcoCupon(code: string, location?: string) {
  const { data: cupon, error: fetchError } = await supabase
    .from('eco_cupons')
    .select('*')
    .eq('code', code)
    .single();

  if (fetchError || !cupon) {
    console.error('Error fetching eco cupon:', fetchError);
    return null;
  }

  if (cupon.status !== 'active') {
    return { valid: false, message: 'Cupón ya utilizado o inactivo' };
  }

  const { error: updateError } = await supabase
    .from('eco_cupons')
    .update({
      status: 'inactive',
      scanned_at: new Date().toISOString(),
      scanned_location: location
    })
    .eq('id', cupon.id);

  if (updateError) {
    console.error('Error updating eco cupon:', updateError);
    return null;
  }

  return { valid: true, cupon };
}

function generateCuponCode(productId: number): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `ECO-${productId}-${timestamp}-${random}`.toUpperCase();
}
