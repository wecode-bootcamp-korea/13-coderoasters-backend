-- products Table Create SQL
CREATE TABLE products
(
    `id`            INT              NOT NULL    AUTO_INCREMENT, 
    `name`          VARCHAR(200)     NOT NULL, 
    `price`         FLOAT            NOT NULL, 
    `image_url`     VARCHAR(1000)    NOT NULL, 
    `product_type`  ENUM('coffee', 'equipment')             NOT NULL,
    `sales_amount`   INT              DEFAULT 0,
    `created_at`    DATETIME         DEFAULT CURRENT_TIMESTAMP COMMENT 'default current time stamp', 
    `updated_at`    DATETIME         ON UPDATE CURRENT_TIMESTAMP COMMENT 'on update current time', 
    `deleted_at`    DATETIME         DEFAULT NULL, 
    PRIMARY KEY (id)
);


-- products Table Create SQL
CREATE TABLE users
(
    `id`             INT             NOT NULL    AUTO_INCREMENT, 
    `first_name`     VARCHAR(50)     NOT NULL, 
    `last_name`      VARCHAR(50)     NOT NULL, 
    `email`          VARCHAR(300)    UNIQUE NOT NULL    COMMENT '이메일은 유니크', 
    `mobile_number`  VARCHAR(50)     DEFAULT NULL, 
    `password`       VARCHAR(200)    NOT NULL, 
    `created_at`    DATETIME         DEFAULT CURRENT_TIMESTAMP COMMENT 'default current time stamp', 
    `updated_at`    DATETIME         ON UPDATE CURRENT_TIMESTAMP COMMENT 'on update current time', 
    `deleted_at`    DATETIME         DEFAULT NULL, 
    PRIMARY KEY (id)
);


-- products Table Create SQL
CREATE TABLE addresses
(
    `id`              INT             NOT NULL    AUTO_INCREMENT, 
    `recipient`       VARCHAR(200)    NOT NULL    COMMENT '수취자', 
    `address`         VARCHAR(200)    NOT NULL, 
    `detail_address`  VARCHAR(200)    NOT NULL, 
    `zip_code`        VARCHAR(200)    NOT NULL, 
    `created_at`    DATETIME         DEFAULT CURRENT_TIMESTAMP COMMENT 'default current time stamp', 
    `updated_at`    DATETIME         ON UPDATE CURRENT_TIMESTAMP COMMENT 'on update current time', 
    `deleted_at`    DATETIME         DEFAULT NULL, 
    `user_id`         INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE addresses
    ADD CONSTRAINT FK_addresses_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE order_statuses
(
    `id`    INT             NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(200)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE order_statuses COMMENT '결제/ 배송/ 상태 값 저장 테이블';


-- products Table Create SQL
CREATE TABLE regions
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(45)    NOT NULL, 
    PRIMARY KEY (id)
);


-- products Table Create SQL
CREATE TABLE grounds
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(45)    NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE grounds COMMENT '커피 그라인딩 타입';


-- products Table Create SQL
CREATE TABLE orders
(
    `id`          INT         NOT NULL    AUTO_INCREMENT, 
    `created_at`    DATETIME         DEFAULT CURRENT_TIMESTAMP COMMENT 'default current time stamp', 
    `updated_at`    DATETIME         ON UPDATE CURRENT_TIMESTAMP COMMENT 'on update current time', 
    `deleted_at`    DATETIME         DEFAULT NULL, 
    `user_id`     INT         NOT NULL, 
    `status_id`   INT         NOT NULL, 
    `address_id`  INT         NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE orders
    ADD CONSTRAINT FK_orders_address_id_addresses_id FOREIGN KEY (address_id)
        REFERENCES addresses (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE orders
    ADD CONSTRAINT FK_orders_user_id_users_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE orders
    ADD CONSTRAINT FK_orders_status_id_order_statuses_id FOREIGN KEY (status_id)
        REFERENCES order_statuses (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE roasters
(
    `id`          INT             NOT NULL    AUTO_INCREMENT, 
    `name`        VARCHAR(20)     NOT NULL, 
    `image_url`   VARCHAR(200)    NOT NULL, 
    `location`    VARCHAR(200)    NOT NULL, 
    `fun_fact`    VARCHAR(200)    DEFAULT NULL, 
    `created_at`    DATETIME         DEFAULT CURRENT_TIMESTAMP COMMENT 'default current time stamp', 
    `updated_at`    DATETIME         ON UPDATE CURRENT_TIMESTAMP COMMENT 'on update current time', 
    `deleted_at`    DATETIME         DEFAULT NULL,  
    `region_id`   INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE roasters
    ADD CONSTRAINT FK_roasters_region_id_regions_id FOREIGN KEY (region_id)
        REFERENCES regions (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE equipments
(
    `id`           INT              NOT NULL    AUTO_INCREMENT, 
    `brand`        VARCHAR(200)     NOT NULL, 
    `description`  VARCHAR(200)     NULL, 
    `type`         VARCHAR(200)     NOT NULL, 
    `title`        VARCHAR(200)     NOT NULL, 
    `note`         VARCHAR(2000)    NOT NULL, 
    `product_id`   INT              UNIQUE NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE equipments
    ADD CONSTRAINT FK_equipments_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE order_products
(
    `id`             INT    NOT NULL    AUTO_INCREMENT, 
    `quantity`  INT    DEFAULT 1   COMMENT 'default = 1', 
    `order_id`       INT    NOT NULL, 
    `product_id`     INT    NOT NULL, 
    `ground_id`      INT    NULL        COMMENT 'coffee_ground_type', 
    PRIMARY KEY (id)
);

ALTER TABLE order_products
    ADD CONSTRAINT FK_order_products_ground_id_grounds_id FOREIGN KEY (ground_id)
        REFERENCES grounds (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE order_products
    ADD CONSTRAINT FK_order_products_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE order_products
    ADD CONSTRAINT FK_order_products_order_id_orders_id FOREIGN KEY (order_id)
        REFERENCES orders (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE coffees
(
    `id`                 INT              NOT NULL    AUTO_INCREMENT, 
    `taste`              VARCHAR(200)     NOT NULL, 
    `roasting_schedule`  VARCHAR(200)     NOT NULL, 
    `process`            VARCHAR(200)     NOT NULL, 
    `elevation`          VARCHAR(200)     NULL, 
    `variety`            VARCHAR(200)     NULL, 
    `note`               VARCHAR(2000)    NULL, 
    `roast_level`        VARCHAR(200)     NOT NULL, 
    `coffee_tastes_like` VARCHAR(200)     NOT NULL, 
    `country`            VARCHAR(200)     NOT NULL, 
    `region`             VARCHAR(200)     NOT NULL, 
    `sub_region`         VARCHAR(200)     NULL, 
    `type`               VARCHAR(200)     NOT NULL, 
    `bag_weight`         VARCHAR(200)     NOT NULL, 
    `available_ground`   TINYINT          NOT NULL, 
    `cold_brew`          TINYINT          NOT NULL, 
    `decaf`              TINYINT          NOT NULL, 
    `espresso`           TINYINT          NOT NULL, 
    `roaster_id`         INT              NOT NULL, 
    `product_id`         INT              UNIQUE NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE coffees
    ADD CONSTRAINT FK_coffees_product_id_products_id FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE coffees
    ADD CONSTRAINT FK_coffees_roaster_id_roasters_id FOREIGN KEY (roaster_id)
        REFERENCES roasters (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE equipment_images
(
    `id`            INT            NOT NULL    AUTO_INCREMENT, 
    `image_url`     VARCHAR(300)    NOT NULL, 
    `equipment_id`  INT            NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE equipment_images
    ADD CONSTRAINT FK_equipment_images_equipment_id_equipments_id FOREIGN KEY (equipment_id)
        REFERENCES equipments (id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- products Table Create SQL
CREATE TABLE delivery_infos
(
    `id`                INT             NOT NULL    AUTO_INCREMENT, 
    `company`           VARCHAR(200)    NOT NULL, 
    `tracking_number`   VARCHAR(200)    NOT NULL, 
    `created_at`    DATETIME         DEFAULT CURRENT_TIMESTAMP COMMENT 'default current time stamp', 
    `updated_at`    DATETIME         ON UPDATE CURRENT_TIMESTAMP COMMENT 'on update current time', 
    `deleted_at`    DATETIME         DEFAULT NULL, 
    `order_product_id`  INT             NOT NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE delivery_infos
    ADD CONSTRAINT FK_delivery_infos_order_product_id_order_products_id FOREIGN KEY (order_product_id)
        REFERENCES order_products (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- products Table Create SQL
CREATE TABLE filter_categories
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(45)    NULL, 
    PRIMARY KEY (id)
);

-- products Table Create SQL
CREATE TABLE filter_options
(
    `id`                  INT            NOT NULL    AUTO_INCREMENT, 
    `name`                VARCHAR(45)    NULL, 
    `filter_category_id`  INT            NULL, 
    PRIMARY KEY (id)
);

ALTER TABLE filter_options
    ADD CONSTRAINT FK_filter_options_filter_category_id_filter_categories_id FOREIGN KEY (filter_category_id)
        REFERENCES filter_categories (id) ON DELETE RESTRICT ON UPDATE RESTRICT;