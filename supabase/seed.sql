-- Insert sample products
INSERT INTO products (image_url, name, status, price, stock, available_at)
VALUES 
  ('https://picsum.photos/400/400', 'Eco Botella Reutilizable', 'active', 19.99, 100, CURRENT_TIMESTAMP),
  ('https://picsum.photos/400/400', 'Bolsa Ecológica', 'active', 9.99, 200, CURRENT_TIMESTAMP),
  ('https://picsum.photos/400/400', 'Set de Cubiertos Bambú', 'active', 24.99, 50, CURRENT_TIMESTAMP),
  ('https://picsum.photos/400/400', 'Cepillo de Dientes Bambú', 'active', 4.99, 300, CURRENT_TIMESTAMP),
  ('https://picsum.photos/400/400', 'Pajitas de Metal', 'active', 14.99, 150, CURRENT_TIMESTAMP)
RETURNING *;
