COPY restaurants (description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/restaurants1.csv' CSV HEADER;
COPY menus (restaurant_id, description, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/menus1.csv' CSV HEADER;
COPY sections (menu_id, title) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/sections1.csv' CSV HEADER;
COPY items (section_id, description, title, price) FROM '/home/jordan/HackReactor/SDC/menu-service/database/datasets/items1.csv' CSV HEADER;
