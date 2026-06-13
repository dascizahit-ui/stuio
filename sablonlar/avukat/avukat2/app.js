const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav]');
const page = document.body.dataset.page;

const practicePages = {
  sirketler: {
    icon: '⚖️',
    category: 'Şirketler Hukuku',
    title: 'Şirketler Hukuku ve Kurumsal Danışmanlık',
    lead: 'Şirketin kuruluşundan ortaklık sözleşmelerine, hisse devrinden ticari uyuşmazlıklara kadar tüm kurumsal risklerin planlı şekilde yönetilmesini sağlar.',
    stats: [['Kapsam', 'Kuruluş + sözleşme + dava'], ['Odak', 'Risk azaltma'], ['Süreç', 'Belge analizi ile başlar']],
    intro: 'Şirketler hukuku, yalnızca şirket kurmak veya dava açmakla sınırlı değildir. Ortaklar arasındaki ilişkinin doğru kurulması, imza yetkilerinin net belirlenmesi, ticari sözleşmelerin öngörülebilir olması ve şirket içi kararların usule uygun alınması ileride doğabilecek uyuşmazlıkların büyük kısmını önler. Bu alanda amaç; şirketin günlük ticari akışını durdurmadan hukuki güvenlik sağlamaktır.',
    services: ['Limited ve anonim şirket kuruluş süreçleri', 'Ana sözleşme ve ortaklar sözleşmesi hazırlanması', 'Hisse devri, pay sahipleri sözleşmesi ve yatırım sözleşmeleri', 'Yönetim kurulu ve genel kurul kararlarının hazırlanması', 'Ticari sözleşme inceleme, revizyon ve müzakere desteği', 'Ortaklıktan çıkma, ayrılma akçesi ve şirket içi uyuşmazlıklar', 'Alacak takibi, ihtarname ve ticari dava stratejisi'],
    process: ['İhtiyaç ve mevcut belge analizi', 'Risklerin önceliklendirilmesi', 'Sözleşme veya dava stratejisi hazırlanması', 'Müzakere, başvuru veya temsil sürecinin yürütülmesi'],
    docs: ['Ticaret sicil kayıtları', 'Mevcut sözleşmeler ve faturalar', 'Ortaklar arası yazışmalar', 'Karar defteri veya genel kurul evrakları', 'Varsa ihtarname ve dava evrakı'],
    faq: [['Şirket kuruluşu için avukat gerekir mi?', 'Zorunlu olmayabilir; ancak ortaklık yapısı, imza yetkisi ve pay devri gibi konuların baştan doğru kurulması ileride ciddi riskleri azaltır.'], ['Ortaklar sözleşmesi neden önemlidir?', 'Ana sözleşmede yer almayan rekabet yasağı, ayrılma şartları, oy hakkı, pay devri ve yönetim yetkileri bu sözleşmede daha net düzenlenebilir.'], ['Sözleşme inceleme ne kadar sürer?', 'Belgenin hacmine göre değişir. Kısa ticari sözleşmelerde ön değerlendirme hızlı yapılabilir; karmaşık sözleşmelerde madde madde risk raporu hazırlanır.']],
    related: [['Ticari sözleşmelerde cezai şart', 'makale.html?slug=ticari-sozlesme-cezai-sart'], ['KVKK veri ihlalinde ilk adımlar', 'makale.html?slug=kvkk-veri-ihlali']]
  },
  ceza: {
    icon: '🛡️', category: 'Ceza Hukuku', title: 'Ceza Hukuku ve Savunma Stratejisi',
    lead: 'Soruşturma ve kovuşturma aşamalarında ifade hazırlığı, delil değerlendirmesi, şikâyet, savunma ve duruşma takibi yapılır.',
    stats: [['Aşama', 'Soruşturma / dava'], ['Odak', 'Delil ve savunma'], ['Hedef', 'Usule uygun takip']],
    intro: 'Ceza dosyalarında zamanlama, ifade içeriği ve delil yönetimi kritik önem taşır. Yanlış veya eksik açıklama, daha sonra telafisi zor sonuçlar doğurabilir. Bu nedenle dosya; olay örgüsü, delil durumu, tanık anlatımları ve hukuki nitelendirme bakımından birlikte değerlendirilmelidir.',
    services: ['Şüpheli veya mağdur vekilliği', 'İfade ve sorgu öncesi hazırlık', 'Şikâyet dilekçesi ve savunma dilekçesi hazırlanması', 'Duruşma takibi ve delil talepleri', 'Tutukluluk, adli kontrol ve itiraz süreçleri', 'İstinaf ve temyiz başvuruları'],
    process: ['Olay anlatımı alınır', 'Delil ve evrak incelenir', 'İfade veya dilekçe stratejisi kurulur', 'Süreç mahkeme veya savcılık nezdinde takip edilir'],
    docs: ['Çağrı kâğıdı veya ifade tutanağı', 'Mesaj, kamera, tanık bilgisi', 'Şikâyet evrakı', 'Mahkeme kararları', 'Varsa bilirkişi raporu'],
    faq: [['İfadeye avukatsız gidilir mi?', 'Gidilebilir; ancak ifade dosyanın yönünü etkileyebileceği için öncesinde hukuki hazırlık yapılması önerilir.'], ['Mağdur taraf da avukatla temsil edilebilir mi?', 'Evet. Şikâyet, delil sunma ve duruşma takibi vekil aracılığıyla yürütülebilir.']],
    related: [['Boşanmada dijital deliller', 'makale.html?slug=bosanma-dijital-delil']]
  },
  'is-hukuku': {
    icon: '💼', category: 'İş Hukuku', title: 'İş Hukuku, Arabuluculuk ve İşveren Danışmanlığı',
    lead: 'İşe iade, kıdem, ihbar, fazla mesai, mobbing, iş kazası, işveren uyum danışmanlığı ve arabuluculuk süreçlerinde destek sağlanır.',
    stats: [['Başlangıç', 'Arabuluculuk'], ['Taraf', 'İşçi / işveren'], ['Odak', 'Süre ve belge']],
    intro: 'İş hukuku dosyalarında süreler ve belgeler belirleyicidir. Fesih bildirimi, bordro, puantaj, yazışma kayıtları ve tanık anlatımları birlikte değerlendirilerek dava veya uzlaşma stratejisi kurulur. İşveren tarafında ise amaç, uyuşmazlık çıkmadan önce sözleşme ve iç süreçleri doğru yapılandırmaktır.',
    services: ['İşe iade ve işçilik alacağı davaları', 'Kıdem, ihbar, fazla mesai ve yıllık izin alacakları', 'Mobbing ve ayrımcılık iddiaları', 'İş kazası dosyaları', 'İş sözleşmesi ve fesih metni hazırlanması', 'İşverenler için disiplin ve uyum süreçleri'],
    process: ['Fesih ve çalışma belgeleri incelenir', 'Arabuluculuk stratejisi belirlenir', 'Uzlaşma veya dava yolu seçilir', 'Duruşma ve icra aşamaları takip edilir'],
    docs: ['İş sözleşmesi', 'Fesih bildirimi', 'Bordro ve SGK kayıtları', 'Mesai kayıtları', 'WhatsApp/e-posta yazışmaları'],
    faq: [['İşe iade için süre önemli mi?', 'Evet. İşe iade başvurularında süre kaçırılırsa hak kaybı doğabilir.'], ['Arabuluculuk zorunlu mu?', 'Birçok işçilik alacağı ve işe iade dosyasında dava öncesi arabuluculuk zorunludur.']],
    related: [['İşe iade davasında süreler', 'makale.html?slug=ise-iade-sureler']]
  },
  idare: {
    icon: '🏛️', category: 'İdare Hukuku', title: 'İdare Hukuku ve Kamu İşlemlerine Karşı Başvuru',
    lead: 'İptal davaları, tam yargı davaları, disiplin işlemleri, ruhsat, idari para cezası ve kamu işleminden kaynaklanan zararlar takip edilir.',
    stats: [['Dava', 'İptal / tam yargı'], ['Kritik', 'Süre hesabı'], ['Odak', 'İdari işlem']],
    intro: 'İdare hukukunda hak arama çoğu zaman kısa süreli başvurulara bağlıdır. Tebliğ tarihi, işlem türü, görevli mahkeme ve yürütmenin durdurulması ihtiyacı birlikte değerlendirilmelidir. Doğru süre hesabı yapılmadan ilerlemek hak kaybına yol açabilir.',
    services: ['İptal davası ve yürütmenin durdurulması talepleri', 'Tam yargı davaları', 'Disiplin cezalarına itiraz', 'Ruhsat ve izin işlemleri', 'İdari para cezalarına karşı başvuru', 'Kamu personeli uyuşmazlıkları'],
    process: ['Tebligat ve işlem tarihi belirlenir', 'Başvuru ve dava süresi hesaplanır', 'Delil ve hukuka aykırılık noktaları çıkarılır', 'Dava veya idari başvuru hazırlanır'],
    docs: ['Tebligat evrakı', 'İdari işlem metni', 'Başvuru dilekçeleri', 'Fotoğraf, rapor veya teknik belge', 'Varsa önceki yazışmalar'],
    faq: [['İdari dava açma süresi ne zaman başlar?', 'Genellikle işlemin tebliği veya öğrenilmesiyle başlar; dosya özelinde ayrıca değerlendirilmelidir.'], ['Yürütmenin durdurulması ne işe yarar?', 'İşlemin dava sonuna kadar uygulanmasını geçici olarak durdurmayı hedefleyen bir taleptir.']],
    related: []
  },
  aile: {
    icon: '👨‍👩‍👧', category: 'Aile Hukuku', title: 'Aile Hukuku, Boşanma ve Velayet Süreçleri',
    lead: 'Anlaşmalı ve çekişmeli boşanma, velayet, nafaka, mal paylaşımı, koruma tedbiri ve dijital delil değerlendirmesi yapılır.',
    stats: [['Dosya', 'Boşanma / velayet'], ['Odak', 'Delil ve hassasiyet'], ['Hedef', 'Hak kaybını önleme']],
    intro: 'Aile hukuku dosyaları yalnızca hukuki değil, duygusal ve ekonomik etkileri olan süreçlerdir. Bu nedenle doğru strateji; delil, çocukların üstün yararı, ekonomik durum, tarafların beklentisi ve dava süresi birlikte düşünülerek kurulmalıdır.',
    services: ['Anlaşmalı boşanma protokolü hazırlanması', 'Çekişmeli boşanma davası', 'Velayet, iştirak nafakası ve yoksulluk nafakası', 'Mal rejimi tasfiyesi', 'Koruma tedbirleri', 'Dijital delil ve tanık stratejisi'],
    process: ['Tarafların beklentisi ve riskleri dinlenir', 'Delil ve ekonomik belgeler incelenir', 'Protokol veya dava planı hazırlanır', 'Duruşma ve karar sonrası işlemler takip edilir'],
    docs: ['Evlilik cüzdanı veya nüfus kaydı', 'Gelir ve malvarlığı belgeleri', 'Mesaj kayıtları ve sosyal medya çıktıları', 'Tanık bilgileri', 'Varsa protokol taslağı'],
    faq: [['Anlaşmalı boşanma için ne gerekir?', 'Tarafların boşanma ve sonuçları konusunda anlaşması, protokol hazırlanması ve mahkemece uygun bulunması gerekir.'], ['Dijital delil kullanılabilir mi?', 'Hukuka uygun elde edilen dijital deliller dosyada değerlendirilebilir.']],
    related: [['Boşanmada dijital deliller', 'makale.html?slug=bosanma-dijital-delil']]
  },
  'bilisim-kvkk': {
    icon: '🔐', category: 'Bilişim & KVKK', title: 'Bilişim Hukuku, KVKK ve Dijital Delil Yönetimi',
    lead: 'Veri ihlali, KVKK uyum, e-ticaret sözleşmeleri, dijital delil, siber suç ve teknoloji şirketleri için sözleşme süreçleri yönetilir.',
    stats: [['Kapsam', 'KVKK + teknoloji'], ['Odak', 'Veri ve delil'], ['Çıktı', 'Uyum planı']],
    intro: 'Dijital dünyada hukuki riskler hızla büyür. Bir veri ihlalinde yanlış zamanlama, e-ticaret sözleşmesinde eksik madde veya dijital delilin hatalı toplanması şirketin itibarını ve dava pozisyonunu zayıflatabilir. Bu alanda teknik ekip ve hukuk ekibinin birlikte çalışması önemlidir.',
    services: ['KVKK uyum ve aydınlatma metni hazırlığı', 'Veri ihlali kriz planı', 'E-ticaret sözleşmeleri ve mesafeli satış süreçleri', 'Siber suç şikâyetleri', 'Dijital delil değerlendirmesi', 'Yazılım, SaaS ve lisans sözleşmeleri'],
    process: ['Veri akışı ve sistem yapısı anlaşılır', 'Risk haritası çıkarılır', 'Metin, politika veya başvuru hazırlanır', 'Uygulama ve takip adımları planlanır'],
    docs: ['Mevcut KVKK metinleri', 'Veri işleme envanteri', 'Sistem logları veya olay kayıtları', 'E-ticaret sözleşmeleri', 'Kullanıcı şikâyetleri'],
    faq: [['Her şirketin KVKK metni olmalı mı?', 'Kişisel veri işleyen her işletmenin aydınlatma, saklama ve güvenlik yükümlülüklerini değerlendirmesi gerekir.'], ['Dijital delil nasıl korunur?', 'Delilin kaynağı, tarihi ve bütünlüğü korunmalı; sonradan değiştirildiği izlenimi doğuracak işlemlerden kaçınılmalıdır.']],
    related: [['KVKK veri ihlalinde ilk 24 saat', 'makale.html?slug=kvkk-veri-ihlali'], ['Ticari sözleşmelerde cezai şart', 'makale.html?slug=ticari-sozlesme-cezai-sart']]
  }
};

const articles = {
  'kvkk-veri-ihlali': {
    category: 'Bilişim Hukuku', read: '9 dk okuma', title: 'KVKK veri ihlalinde şirketlerin ilk 24 saati',
    lead: 'Veri ihlali fark edildiğinde panik yerine doğru sıralama gerekir: olayın kapsamını belirlemek, delilleri korumak, etkilenen kişileri anlamak ve bildirim yükümlülüğünü değerlendirmek.',
    sections: [
      ['İlk adım: olayı dondurmak ve kayıt altına almak', 'Veri ihlali şüphesi doğduğunda şirketin ilk yapması gereken şey, olayın büyümesini engellerken mevcut delilleri korumaktır. Sistem logları, erişim kayıtları, hata mesajları, kullanıcı şikâyetleri ve teknik ekip notları tek dosyada toplanmalıdır. Bu aşamada gelişigüzel silme, yeniden kurulum veya kayıt temizleme işlemleri ileride ihlalin kapsamını belirlemeyi zorlaştırabilir.'],
      ['İhlalin kapsamını belirlemek', 'Hangi kişisel verilerin etkilendiği, kaç kişinin risk altında olduğu, verinin kimler tarafından görüldüğü ve ihlalin ne kadar sürdüğü belirlenmelidir. Kimlik bilgileri, iletişim verileri, finansal veriler veya özel nitelikli veriler farklı risk seviyeleri doğurabilir. Bu nedenle teknik inceleme ile hukuki değerlendirme aynı anda yürümelidir.'],
      ['Bildirim değerlendirmesi', 'Her olay otomatik olarak aynı sonucu doğurmaz. Ancak ihlalin kişiler üzerinde olumsuz sonuç doğurma ihtimali varsa bildirim süreci gündeme gelebilir. Şirket, olayın türünü, alınan tedbirleri, etkilenen kişi gruplarını ve önerilen koruma adımlarını açık şekilde hazırlamalıdır.'],
      ['İç iletişim ve dış iletişim dili', 'Veri ihlali süreçlerinde aceleyle yapılan açıklamalar şirketi daha zor duruma sokabilir. Yönetim, teknik ekip, müşteri destek ve hukuk danışmanı aynı bilgi setiyle hareket etmelidir. Müşteriye veya çalışanlara yapılacak açıklama sade, doğru ve abartısız olmalıdır.'],
      ['Sonraki dönem: tekrarını önleme', 'İlk kriz geçtikten sonra asıl değerli aşama kök neden analizidir. Parola politikası, erişim yetkileri, tedarikçi güvenliği, yedekleme sistemi ve çalışan farkındalığı gözden geçirilmelidir. Böylece dosya yalnızca kriz yönetimiyle kalmaz, kurumsal güvenlik standardına dönüşür.']
    ],
    bullets: ['Olay saatini, tespit eden kişiyi ve ilk bulguları yazılı hale getirin.', 'Sistem kayıtlarını koruyun ve yetkisiz erişim ihtimalini teknik olarak sınırlayın.', 'Etkilenen veri türlerini ve kişi gruplarını sınıflandırın.', 'Yönetim, teknik ekip ve hukuk danışmanını aynı değerlendirme masasında toplayın.'],
    note: 'Bu makale genel bilgilendirme niteliğindedir. Somut olayın veri türü, sistem yapısı ve etkilenen kişi grubu ayrıca değerlendirilmelidir.'
  },
  'ticari-sozlesme-cezai-sart': {
    category: 'Şirketler Hukuku', read: '8 dk okuma', title: 'Ticari sözleşmelerde cezai şart nasıl düzenlenmeli?',
    lead: 'Cezai şart maddesi, tarafları disipline eden güçlü bir araçtır; fakat belirsiz, ölçüsüz veya yanlış kurgulanmış hükümler uyuşmazlık anında beklenen korumayı sağlamayabilir.',
    sections: [
      ['Cezai şartın amacı nedir?', 'Cezai şart, sözleşmenin ihlal edilmesi halinde uygulanacak parasal sonucu önceden belirler. Özellikle teslim gecikmesi, ödeme gecikmesi, gizlilik ihlali, rekabet yasağı ve hizmet seviyesinin düşmesi gibi alanlarda şirketlere öngörülebilirlik sağlar.'],
      ['Belirsiz madde riski', 'Sözleşmede hangi davranışın ihlal sayılacağı açık değilse cezai şart maddesi tartışmalı hale gelir. Örneğin sadece “yükümlülüğe aykırılık halinde ceza uygulanır” demek yerine; geç teslim, eksik teslim, izinsiz paylaşım veya ödeme gecikmesi gibi ihlaller ayrı ayrı yazılmalıdır.'],
      ['Orantı ve ticari gerçeklik', 'Cezai şartın miktarı belirlenirken sözleşmenin bedeli, ihlalin doğuracağı zarar ve tarafların ticari gücü dikkate alınmalıdır. Aşırı yüksek cezalar müzakereyi zorlaştırabilir ve uyuşmazlıkta indirime konu olabilir. Bu nedenle koruyucu ama savunulabilir bir oran belirlemek önemlidir.'],
      ['Temerrüt, faiz ve tazminat ilişkisi', 'Cezai şartın yanında faiz, gecikme tazminatı veya ek zarar talebi düzenlenecekse bu ilişkinin açık kurulması gerekir. Aksi halde aynı ihlal için hangi kalemin istenebileceği tartışma konusu olur.'],
      ['Uygulama dili', 'İyi bir cezai şart maddesi yalnızca ceza miktarını yazmaz; ihlalin nasıl tespit edileceğini, bildirim süresini, ödeme zamanını ve diğer hakların saklı olup olmadığını da gösterir.']
    ],
    bullets: ['İhlal türlerini ayrı ayrı yazın.', 'Ceza miktarını sözleşme bedeliyle orantılı kurun.', 'Faiz, tazminat ve cezai şart ilişkisini açık düzenleyin.', 'Bildirim ve ödeme süresini maddeye ekleyin.'],
    note: 'Sözleşme maddeleri sektör, taraf dengesi ve ticari model dikkate alınarak hazırlanmalıdır.'
  },
  'bosanma-dijital-delil': {
    category: 'Aile Hukuku', read: '10 dk okuma', title: 'Boşanma davasında dijital deliller nasıl değerlendirilir?',
    lead: 'Mesaj kayıtları, sosyal medya paylaşımları, e-postalar ve ekran görüntüleri boşanma dosyalarında önemli olabilir; ancak delilin hukuka uygun elde edilmesi her şeyden önce gelir.',
    sections: [
      ['Dijital delil ne olabilir?', 'WhatsApp mesajları, SMS, e-posta, sosyal medya paylaşımı, fotoğraf, video, konum kaydı ve banka hareketleri aile hukuku dosyalarında tartışma konusu olabilir. Ancak her dijital kayıt doğrudan kullanılabilir anlamına gelmez.'],
      ['Hukuka uygun elde etme sınırı', 'Başkasının hesabına izinsiz girmek, şifre kırmak, gizlice cihaz karıştırmak veya özel alanı ihlal etmek dosyaya zarar verebilir. Delil toplarken haklı konumdayken haksız duruma düşmemek gerekir.'],
      ['Ekran görüntüsünün tek başına gücü', 'Ekran görüntüleri pratik olsa da tek başına her zaman yeterli görülmeyebilir. Tarih, gönderici, bağlam ve delilin bütünlüğü önemlidir. Gerekirse noter tespiti, uzman incelemesi veya başka delillerle destekleme düşünülebilir.'],
      ['Çocuklar ve özel hayat hassasiyeti', 'Aile hukuku dosyalarında çocukların üstün yararı gözetilir. Çocuğu doğrudan uyuşmazlığın içine çeken delil yöntemleri dikkatle ele alınmalıdır. Amaç karşı tarafı yıpratmak değil, hukuki iddiayı ispatlamaktır.'],
      ['Dosya stratejisi', 'Her delil dosyaya konulmak zorunda değildir. Bazı kayıtlar dava stratejisini güçlendirirken bazıları tartışmayı gereksiz büyütebilir. Bu nedenle deliller önce hukuki önem ve risk açısından sınıflandırılmalıdır.']
    ],
    bullets: ['Delilin nasıl elde edildiğini not edin.', 'Tarih ve bağlam bilgisini koruyun.', 'Hesaplara izinsiz erişimden kaçının.', 'Ekran görüntülerini mümkünse ek delillerle destekleyin.'],
    note: 'Aile hukuku dosyaları kişiye özel değerlendirme gerektirir. Delil kullanmadan önce hukuki görüş alınması faydalıdır.'
  },
  'ise-iade-sureler': {
    category: 'İş Hukuku', read: '7 dk okuma', title: 'İşe iade davasında süreler ve arabuluculuk aşaması',
    lead: 'İşe iade sürecinde hak kaybı yaşamamak için fesih bildiriminin tarihi, arabuluculuk başvurusu ve dava süresi dikkatle takip edilmelidir.',
    sections: [
      ['Fesih bildirimi neden önemli?', 'İşe iade değerlendirmesi işverenin fesih gerekçesi üzerinden yapılır. Fesih yazısı, gerekçenin açık olup olmadığı ve işçinin savunmasının alınıp alınmadığı gibi noktalar dava stratejisinde belirleyicidir.'],
      ['Arabuluculuk aşaması', 'İşe iade taleplerinde dava açmadan önce arabuluculuk yoluna başvurulması gerekir. Bu görüşme yalnızca formalite değildir; doğru hazırlıkla işçi veya işveren için makul bir çözüm zemini oluşturabilir.'],
      ['Dava stratejisi', 'Dava açılacaksa işçinin iş güvencesi kapsamında olup olmadığı, işyerindeki çalışan sayısı, kıdem süresi ve fesih gerekçesinin geçerliliği incelenmelidir. Tanıklar, yazışmalar ve performans kayıtları önem taşır.'],
      ['İşveren açısından hazırlık', 'İşverenler için işe iade riski, fesih öncesi doğru disiplin süreci ve yazılı kayıtla azaltılabilir. Performans, devamsızlık veya işletmesel gerekçeler belgelendirilmeli, süreç sonradan açıklanabilir olmalıdır.']
    ],
    bullets: ['Fesih bildiriminin tarihini ve içeriğini saklayın.', 'Arabuluculuk başvuru süresini kaçırmayın.', 'Bordro, SGK, yazışma ve tanık bilgilerini hazırlayın.', 'Uzlaşma ihtimalini dava maliyetiyle birlikte değerlendirin.'],
    note: 'İşe iade ve işçilik alacakları süreye bağlı haklar içerdiği için dosyanın gecikmeden değerlendirilmesi gerekir.'
  }
};

const setHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18 || page !== 'home');
};
window.addEventListener('scroll', setHeader);
setHeader();

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => observer.observe(item));
};

const normalizeText = (value) => value.toLocaleLowerCase('tr-TR').trim();
const initHome = () => {
  const articleSearch = document.querySelector('#articleSearch');
  const clearSearch = document.querySelector('#clearSearch');
  const articleCards = document.querySelectorAll('.article-card');
  const emptyState = document.querySelector('#emptyState');
  if (articleSearch && clearSearch) {
    const filterArticles = () => {
      const query = normalizeText(articleSearch.value);
      let visibleCount = 0;
      articleCards.forEach((card) => {
        const searchable = normalizeText(`${card.dataset.title} ${card.dataset.category} ${card.textContent}`);
        const isVisible = searchable.includes(query);
        card.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    };
    articleSearch.addEventListener('input', filterArticles);
    clearSearch.addEventListener('click', () => { articleSearch.value = ''; filterArticles(); articleSearch.focus(); });
  }

  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => trigger.closest('.accordion').classList.toggle('open'));
  });

  const contactForm = document.querySelector('#contactForm');
  const formMessage = document.querySelector('#formMessage');
  const successModal = document.querySelector('#successModal');
  const contactSummary = document.querySelector('#contactSummary');
  const openModal = (modal) => { modal?.classList.add('open'); modal?.setAttribute('aria-hidden', 'false'); };
  const closeModal = (modal) => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden', 'true'); };
  document.querySelectorAll('[data-close-success]').forEach((item) => item.addEventListener('click', () => closeModal(successModal)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(successModal); });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        if (formMessage) { formMessage.textContent = 'Lütfen zorunlu alanları doldurun. Açıklama en az 20 karakter olmalı.'; formMessage.className = 'form-message error'; }
        contactForm.reportValidity();
        return;
      }
      const formData = new FormData(contactForm);
      if (contactSummary) contactSummary.textContent = `${formData.get('name')} için ${formData.get('field')} alanında iletişim talebi oluşturuldu. En kısa sürede dönüş yapılacaktır.`;
      if (formMessage) { formMessage.textContent = 'Talebiniz oluşturuldu. En kısa sürede dönüş yapılacaktır.'; formMessage.className = 'form-message ok'; }
      contactForm.reset();
      openModal(successModal);
    });
  }
};

const renderPracticeDetail = () => {
  const root = document.querySelector('#practiceDetail');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const key = params.get('alan') || 'sirketler';
  const data = practicePages[key] || practicePages.sirketler;
  document.title = `${data.category} | Lexora Hukuk`;
  root.innerHTML = `
    <section class="detail-hero">
      <div class="container detail-hero-grid">
        <div class="reveal visible">
          <a class="back-link" href="index.html#uzmanlik">← Uzmanlık alanlarına dön</a>
          <span class="detail-kicker">${data.category}</span>
          <h1 class="detail-title">${data.title}</h1>
          <p class="detail-lead">${data.lead}</p>
          <div class="detail-stat-grid">${data.stats.map(([label, value]) => `<div class="detail-stat"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>
        </div>
        <div class="detail-visual reveal visible"><div class="detail-visual-card"><span class="icon">${data.icon}</span><h3>${data.category}</h3><p>${data.lead}</p></div></div>
      </div>
    </section>
    <section class="container detail-layout">
      <div class="detail-stack">
        <article class="detail-panel reveal visible"><h2>Bu alan neden önemlidir?</h2><p>${data.intro}</p></article>
        <article class="detail-panel reveal visible"><h2>Kapsadığı hizmetler</h2><ul class="rich-list">${data.services.map(item => `<li>${item}</li>`).join('')}</ul></article>
        <article class="detail-panel reveal visible"><h2>Süreç nasıl ilerler?</h2><div class="process-grid">${data.process.map((item, index) => `<div class="process-card"><span>${String(index + 1).padStart(2, '0')}</span><p>${item}</p></div>`).join('')}</div></article>
        <article class="detail-panel reveal visible"><h2>İlk görüşme için faydalı belgeler</h2><ul class="doc-list">${data.docs.map(item => `<li>${item}</li>`).join('')}</ul></article>
        <article class="detail-panel reveal visible"><h2>Sık sorulan sorular</h2>${data.faq.map(([q, a], idx) => `<div class="accordion ${idx === 0 ? 'open' : ''}"><button class="accordion-trigger" type="button">${q}</button><div class="accordion-content"><p>${a}</p></div></div>`).join('')}</article>
      </div>
      <aside class="side-card reveal visible"><span class="tag">Ön Değerlendirme</span><h3>Dosyanız bu alanla ilgiliyse bize ulaşın.</h3><p>Olayı ve belgeleri kısaca paylaşarak ilk değerlendirme talebi oluşturabilirsiniz.</p><a class="btn primary" href="index.html#iletisim">İletişime geç</a><div class="contact-mini"><span>+90 212 000 00 00</span><span>iletisim@lexorahukuk.com</span></div>${data.related.length ? `<h3>İlgili makaleler</h3><div class="related-grid">${data.related.map(([title, href]) => `<a class="related-link" href="${href}">${title} →</a>`).join('')}</div>` : ''}</aside>
    </section>`;
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => trigger.addEventListener('click', () => trigger.closest('.accordion').classList.toggle('open')));
};

const renderArticleDetail = () => {
  const root = document.querySelector('#articleDetail');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || 'kvkk-veri-ihlali';
  const article = articles[slug] || articles['kvkk-veri-ihlali'];
  document.title = `${article.title} | Lexora Hukuk`;
  const headings = article.sections.map(([heading], index) => `<a href="#bolum-${index + 1}">${heading}</a>`).join('');
  root.innerHTML = `
    <section class="detail-hero">
      <div class="container detail-hero-grid">
        <div class="reveal visible">
          <a class="back-link" href="index.html#makaleler">← Makalelere dön</a>
          <span class="detail-kicker">${article.category} • ${article.read}</span>
          <h1 class="detail-title">${article.title}</h1>
          <p class="detail-lead">${article.lead}</p>
        </div>
        <aside class="side-card reveal visible"><span class="tag">İçindekiler</span><div class="article-toc">${headings}</div><a class="btn primary" href="index.html#iletisim">Danışmanlık al</a></aside>
      </div>
    </section>
    <section class="container detail-layout">
      <article class="detail-panel article-body reveal visible">
        ${article.sections.map(([heading, text], index) => `<h2 id="bolum-${index + 1}">${heading}</h2><p>${text}</p>`).join('')}
        <h2>Pratik kontrol listesi</h2>
        <ul>${article.bullets.map(item => `<li>${item}</li>`).join('')}</ul>
        <p class="article-note">${article.note}</p>
      </article>
      <aside class="side-card reveal visible"><span class="tag">İlgili Alanlar</span><a class="related-link" href="uzmanlik.html?alan=sirketler">Şirketler Hukuku →</a><a class="related-link" href="uzmanlik.html?alan=bilisim-kvkk">Bilişim & KVKK →</a><a class="related-link" href="uzmanlik.html?alan=aile">Aile Hukuku →</a><a class="related-link" href="uzmanlik.html?alan=is-hukuku">İş Hukuku →</a></aside>
    </section>`;
};

document.addEventListener('DOMContentLoaded', () => {
  initHome();
  renderPracticeDetail();
  renderArticleDetail();
  revealItems();
});
