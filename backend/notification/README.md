# Guide Installation Tools
 - ติดตั้ง Docker --> [Click](https://www.docker.com/products/docker-desktop/)
 - ติดตั้ง Java 17+ --> [Click](https://adoptium.net/temurin/releases/)
 - ติดตั้ง Maven --> [Click](https://maven.apache.org/download.cgi)
 - เช็ค Java ด้วยคำสั่ง `java --version` ที่ **cmd** หรือ **terminal**
 - เช็ค Maven ด้วยคำสั่ง `mvn -v` ที่ **cmd** หรือ **terminal**
 - ติดตั้ง Github Desktop --> [Click](https://desktop.github.com/download/)
 - ติดตั้ง postgreSQL version 16.4 -->[Click](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
## Tip
 - หลังจากลงเครื่องมือครบแล้วให้ **Clone Github**ได้เลยแนะนำว่าให้ทุกคนมี **Github Desktop** เพื่อง่ายต่อการ clone project
 - postgreSQL เปลี่ยน **wal_level = logical**  ที่ path: C:\Program Files\PostgreSQL\<version>\data\postgresql.conf หาดีๆเปิดจาก **notepad** [**ตัวอย่าง**](https://chatgpt.com/share/6727041f-71a0-8001-8a96-f9562a448c28)
 - สามารถ ลบ **--rm** ได้ถ้าไม่อยากให้ **container** ใน    **docker** หายไปทุกๆครั้ง

## Docker
 - การเปิด **zookeeper** สามารถใช้คำสั่ง
`docker run -d --rm --name zookeeper -p 2181:2181 -p 2888:2888 -p 3888:3888 quay.io/debezium/zookeeper:2.7`

 - การเปิด **Kafka** สามารถใช้คำสั่ง
`docker run -d --rm --name kafka -p 9092:9092 --link zookeeper:zookeeper -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://172.25.208.1:9092 -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 quay.io/debezium/kafka:2.7`
 เปลี่ยน **KAFKA_ADVERTISED_LISTENERS=PLAINTEXT** เป็น **IP** ของเครื่องตัวเอง ถ้าไม่รู้ **IP** ใช้คำสั่ง **ipconfig** แล้วให้หา **IPv4 Address** จะเจอ IP เครื่องของตัวเอง
 
 - การเปิด **Debezium connect** เพื่อเชื่อมต่อกับ **Kafka** และ **postgreSQL** สามารถใช้คำสั่ง 
`docker run -d --rm --name connect -p 8083:8083 -e GROUP_ID=1 -e CONFIG_STORAGE_TOPIC=my_connect_configs -e OFFSET_STORAGE_TOPIC=my_connect_offsets -e STATUS_STORAGE_TOPIC=my_connect_statuses -e KAFKA_BOOTSTRAP_SERVERS=host.docker.internal:9092 -e POSTGRES_HOST=172.25.208.1 -e POSTGRES_PORT=5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=user1234 --link kafka:kafka quay.io/debezium/connect:2.7`
เปลี่ยนเป็น **POSTGRES_HOST=** **IP** เครื่องตัวเอง

	ให้ใช้คำสั่งนี้เพื่อทำการสร้าง **topic** และ **group id** ของ **kafka** ที่ต้องการจะรับ **Event message**
`curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors/ -d "{ \"name\": \"inventory-connector\", \"config\": { \"connector.class\": \"io.debezium.connector.postgresql.PostgresConnector\", \"tasks.max\": \"1\", \"database.hostname\": \"host.docker.internal\", \"database.port\": \"5432\", \"database.user\": \"postgres\", \"database.password\": \"user1234\", \"database.dbname\": \"InventoryManagement\", \"database.server.name\": \"dbserver1\", \"plugin.name\": \"pgoutput\", \"slot.name\": \"inventory_slot\", \"topic.prefix\": \"dbserver1\", \"schema.include.list\": \"public\", \"schema.history.internal.kafka.bootstrap.servers\": \"kafka:9092\", \"schema.history.internal.kafka.topic\": \"schemahistory.inventory\" } }"`

 - **UI** สำหรับดู **Event** ที่มีการเปลี่ยนแปลง
`docker run -p 8080:8080 -e KAFKA_BROKERS=host.docker.internal:9092 docker.redpanda.com/redpandadata/console:latest`
ดูเพิ่มเติมได้ที่ [github](https://github.com/redpanda-data/console)

	
## Run project
ใช้คำสั่ง `mvn spring-boot:run` หรือ กด Run ที่หน้าหลักได้เช่นกัน
สามารถลอง create , update หรือ deleted ที่ **postgreSQL** เพื่อดู **Event message** ที่ terminal ได้เลย
เปิด `localhost:8081` ใส่ **user: admin** และ **password: user1234**
สามารถไปที่ [github](https://github.com/poonyawat0511/spring-boot-rest-api) เพื่อใช้ Crud ได้บน **postman** ที่มีการต่อกับ **postgreSQL** แล้วได้เลย
