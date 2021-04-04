# Kartaca
## Projenin Çalıştırılması
Projeyi indirdikten sonra aşağıdaki adımlar sırayla uygulanmalıdır.
1. docker build -t minimal-node .  komutu ile imagemizi oluşturuyoruz.
2. docker run -p 3000:3000  minimal-node komutu ile imagemizi çalıştırıyoruz ve otomatik olarak kurulum yapılıyor.
3. Apache kafkayı çalıştırıyoruz.
4. terminalden cd log-store ile log-store dizinine geçiyoruz.
5. node topic.js ve node consumer.js ile dosyalarımızı çalıştırıyoruz.
6. Canlı HTTP requestleri izleyebilmek için client klasörü içindeki index.html bir live serverde çalıştırılmalıdır. Çalıştırıldıktan sonra HTTP Requestler canlı olarak izlenebilir.

## Api Istekleri
- Apiye localhost:3000/posts adresinden Postman ile http requestler gönderilebilir.
- Put request için localhost:3000/posts/idno ile istek yollanabilir.
- APİ POST VE DELETE isteklerini boş body ile kabul edebilmektedir.


# Özel Anahtar Kodu
gAAAAABgUhDY8NswH84cDsJqo3BYaeQ8C3jQP5c_Z3AtRTDGIpnw9_IU8X6cBqAAv_1e-x6JG33WcZ-0nRu4lNiD3ykL5hr2_vM3XmitOSaWwfhnCdn33Ti87ToUpBiLxeYpIA4zSQ2WBGSvqYcDmBRSCB_LLZuaROYiUO5mNDUqAWsnoslH8q52FqUD7HcGnyo7x-OMTMMMd2Fmok5eDm_0jUJW092k6A==

