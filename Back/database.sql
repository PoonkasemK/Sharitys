psql -U postgres
drop database sharitysdb;
create database sharitysdb;

CREATE TYPE uType AS ENUM('ad','dn','fd');
CREATE TYPE pjType AS ENUM('animal','disaster','nature','accident','education','others');
CREATE TYPE pjBankType AS ENUM ('baac','bay','bbl','bnp','boa','cacib','cimb','citi','db','ghb','gsb','hsbc','ibank','icbc','jpm','kbank','kk','ktb','lhb','mb','mega','mufg','rbs','sc','scb','smbc','tbank','tcrb','tisco','tmb','uob');
CREATE TYPE pjOwnwerType AS ENUM ('ind', 'group','org');
CREATE TYPE pjStatus AS ENUM ('pendingforap','terminated','fundraising','pendingforter' );

CREATE table project(
    pjid SERIAL Primary Key,
    pjName VARCHAR(100),   

    pjGoal text,
    pjDesc text,
    pjBenefit text,

    pjImage text,

    pjBankType pjBankType,
    pjBankNo text,
    pjBankName text,

    pjStatus pjStatus,
    pjUrgent VARCHAR(1),
    pjTerminateReason text,    
    pjStartDate DATE,
    pjEndDate DATE,
    pjAmount Float(20),
    pjCurrentAmount Float(20),

    /* Check range of the possible hyperlink length again ?*/   
    pjFb  text,
    pjTwt text,
    pjIG  text,

    /* Gift and Souvenir haven't added yet */

    pjOwnerType pjOwnwerType,
    pjOwnerName VARCHAR(100),
    pjOwnerEmail text,

    pjType pjType,
    recpId text,
    fdfirebaseid text,
    /*tyid integer REFERENCES projectType*/

    pjSouvenir1 text, 
    pjSouvenir2 text, 
    pjSouvenir3 text, 
    pjSPrice1 INT, 
    pjSPrice2 INT,
    pjSPrice3 INT
    );

CREATE table projectupdate(
    upid SERIAL Primary Key,
    upTitle Text,
    upDesc Text,
    upImage Text,
    upDay date,
    pjid integer REFERENCES project
);

ALTER SEQUENCE project_pjid_seq RESTART WITH 1;

INSERT INTO project
(
    pjName,   

    pjGoal ,
    pjDesc ,
    pjBenefit ,

    pjImage ,

    pjBankType ,
    pjBankNo ,
    pjBankName,

    pjStatus ,
    pjUrgent,
    pjTerminateReason ,    
    pjStartDate ,
    pjEndDate ,
    pjAmount ,
    pjCurrentAmount,

    pjFb  ,
    pjTwt ,
    pjIG  ,

    pjOwnerType ,
    pjOwnerName ,
    pjOwnerEmail ,

    pjType ,
    recpId ,
    fdfirebaseid,

    
    pjSouvenir1 , 
    pjSouvenir2 , 
    pjSouvenir3 , 
    pjSPrice1 , 
    pjSPrice2 ,
    pjSPrice3 
    )
VALUES
('Little miracles ปาฏิหาริย์เล็กๆ เพื่อผู้ป่วยเด็กไอซียู',
'จัดซื้อเตียงและครุภัณฑ์ทางการแพทย์เทคโนโลยีขั้นสูง ให้ผู้ป่วยเด็กระยะวิกฤตเป็นผู้เจ็บป่วยในภาวะฉุกเฉิน(ICU) ที่ต้องได้รับการเฝ้าระวัง การรักษาดูแลอย่างใกล้ชิด และช่วยเหลืออย่างทันท่วงที เพื่อป้องกันภาวะแทรกซ้อนต่างๆ ที่เกิดขึ้นและอาจมีความรุนแรงถึงแก่ชีวิต', 
'สถาบันสุขภาพเด็กแห่งชาติมหาราชินี (หรือคนทั่วไปรู้จักกันดีในชื่อโรงพยาบาลเด็ก) เป็นสถานพยาบาลของรัฐเพียงแห่งเดียวในประเทศไทยที่ให้การรักษาเฉพาะผู้ป่วยเด็ก มีผู้ป่วยนอกมารับบริการเฉลี่ยปีละ 400,000 ราย/ปี ผู้ป่วยในปีละ 18,000 ราย/ปี ส่วนใหญ่เป็นผู้ป่วยโรคยุ่งยากซับซ้อน อาทิ โรคหัวใจ โรคมะเร็ง โรคทางระบบประสาทและสมอง ทารกคลอดก่อนกำหนด ทารกพิการ เป็นต้น
ผู้ป่วยเด็กที่มารับบริการส่วนใหญ่มีฐานะยากจนกว่าร้อยละ 80 และเป็นผู้ป่วยที่ส่งต่อมาจากโรงพยาบาลอื่นๆ ทั่วประเทศกว่าร้อยละ 90 เนื่องจาก จำเป็นต้องได้รับการรักษาเฉพาะทาง โรงพยาบาลเด็ก จึงเป็นเสมือนจุดสุดท้ายในการให้การรักษาโรคยุ่งยากซับซ้อนในผู้ป่วยเด็กไทย
ในจำนวนผู้ป่วยเด็กที่เข้ารับการรักษาที่สถาบันสุขภาพเด็กฯ มีจำนวนผู้ป่วยเด็กป่วยในระยะวิกฤต ที่ต้องได้รับการรักษาอย่างเร่งด่วนและใกล้ชิดจากแพทย์พยาบาลและมีปริมาณเพิ่มขึ้นอย่างมาก ซึ่งปัจจุบันโรงพยาบาลเด็ก มีเตียงผู้ป่วยจำนวน 452 เตียง ในจำนวนนี้ต้องแบ่งเป็นเตียง ICU สำหรับดูแลเด็กวัย 1 เดือน –15 ปี อีก 15-20% หรือคิดเป็น 68-90 เตียง
เตียง ICU สำหรับผู้ป่วยเด็กฉุกเฉิน ที่มีเพียง 38 เตียงในปัจจุบัน จึงไม่เพียงพอต่อความต้องการ การขาดแคลนเตียงผู้ป่วยฉุกเฉิน และอุปกรณ์ในห้องฉุกเฉิน อาทิ เครื่องช่วยหายใจ เครื่องติดตามการทำงานของหัวใจ และชุดศูนย์รวมเครื่องมือแพทย์ ฯลฯ ซึ่งถือเป็นปัญหาสำคัญ ทำให้ผู้ป่วยเด็กหลายรายขาดโอกาสกลับมามีสุขภาพแข็งแรง เติบโตเป็นอนาคตของชาติ แม้ว่าสถาบันฯ จะได้รับเงินสนับสนุนจากรัฐ แต่ยังไม่เพียงพอต่อจำนวนผู้ป่วยเด็กที่เพิ่มขึ้นในแต่ละปี',
'โครงการ Little miracles ปาฏิหาริย์เล็กๆ เพื่อผู้ป่วยเด็กไอซียู คือโครงการระดมทุนเพื่อมอบโอกาสแห่งความเป็นไปได้ ให้เด็กไทยมีอนาคตที่แข็งแรง พร้อมสร้างปาฏิหาริย์ให้กับโลกนี้ได้ต่อไป โดยมีเป้าหมายเพื่อเพิ่มเตียง ICU และครุภัณฑ์ทางการแพทย์ขั้นสูง สำหรับผู้ป่วยเด็กวิกฤต เพื่อให้ผู้ป่วยทุกรายมีโอกาสเข้าถึงการรักษาอย่างเท่าเทียมและทันท่วงทีเพราะทุกชีวิตมีความหมาย ไม่ว่าจะยากดีมีจน ทุกวินาทีวิกฤต คือโอกาสแห่งปาฏิหาริย์ที่อาจช่วยต่อลมหายใจให้เด็กน้อยกลับมาแข็งแรงได้อีกครั้ง โดยสถาบันฯ จะสามารถขยายจำนวนเตียง ICU ได้อีก 24 เตียง รวมเป็นจำนวนเตียงICU ทั้งหมด 62 เตียง',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fpj5.jpg?alt=media&token=c3f5e56d-af7d-4f24-ba4c-d459bd5b789a',
'scb','4828882','Chanikan Chan','fundraising','n','','2021-03-02','2021-08-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Path Doctor','pathdoctor@gmail.com','accident','recp_test_5nj8f1gunxt91ju6rfz','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400),

('Foster Parents ร่วมเป็นพ่อแม่อุปถัมภ์ให้น้องช้าง',
'ร่วมเป็นพ่อ แม่ อุปถัมภ์ให้น้องช้างที่มูลนิธิอนุรักษ์ช้างและสิ่งแวดล้อม จ.เชียงใหม่ ได้มีอาหารกินอย่างเพียงพอ ผ่านพ้นวิกฤติโควิด-19', 
'มูลนิธิอนุรักษ์ช้างและสิ่งแวดล้อม เป็นองค์กรที่ไม่แสวงหาผลกำไร ที่ก่อตั้งขึ้นเพื่อปกป้อง ช่วยเหลือและดูแล เป็นที่พักพิงให้แก่ช้างพิการ สุนัจรจัด แมวที่ถูกทารุณกรรม วัว ควาย หมู กระต่าย ม้า รวมทั้งสัตว์อื่นๆ กว่า 3,000 ชีวิต สัตว์ทั้งหมดที่มูลนิธิฯรับมาช่วยเหลือนั้น ต่างถูกทารุณกรรม เราจึงจำเป็นต้องฟื้นฟูทั้งสภาพร่างกายและจิตใจให้สัตว์เหล่านั้นยังรู้ว่าโลกนี้ยังมีคนที่รักและใส่ใจ ชีวิตและความเป็นอยู่ของพวกเขา ไม่ควรมีใครก็ตาม ทั้งคนหรือสัตว์ที่เกิดมาแล้วต้องมีชีวิตอย่างทุกข์ทรมานจากการทำร้ายและโดนทารุณ

ยกตัวอย่างเช่น แม่ศรีนวล เกิดประมาณปี พ.ศ. 2505 ได้รับการช่วยเหลือจากจังหวัดสุรินทร์เมื่อปลายปี พ.ศ. 2548 เมื่อก่อนแม่ศรีนวลเป็นช้างเดินถนน เดินป่ากับนักท่องเที่ยวและลากไม้มาก่อน แม่ศรีนวลตาบอดที่ข้างซ้ายซึ่งน่าจะมาจากการถูกยิงด้วยหนังสติ๊ก แม่ศรีนวลเป็นช้างเพศเมียที่มีขนาดใหญ่ที่สุดใน Elephant Nature Park เธอมีหัวที่โตและหูขนาดใหญ่มาก และแม้ว่าเธอจะตัวใหญ่แต่เธอมีจิตใจที่งดงามและรักสงบมาก

เมื่อเกิดการแพร่ระบาดเชื้อไวรัสโควิด-19 ตั้งแต่ต้นปี 2563 ที่ผ่านมา ผู้บริจาคหลักของมูลนิธิฯ จำเป็นต้องหยุดให้การสนับสนุน ทำให้กระทบต่อชีวิตความเป็นอยู่ของช้างและสัตว์ที่อยู่ในความดูแลของมูลนิธิอนุรักษ์ช้างและสิ่งแวดล้อมมากกว่า 3,000 ชีวิต ไม่ได้รับอาหารที่เพียงพอในแต่ละวัน

มูลนิธิฯจึงตั้งโครงการ Foster Parents ขึ้นเพื่อรับเป็นพ่อแม่อุปถัมภ์ให้น้องช้าง โดยผู้บริจาคสามารถเลือกช้างมาเป็นลูกในการอุปการะได้ โดยบริจาคเงินเป็นค่าอาหารและค่าดูแลช้างเวลาเจ็บป่วย โดยปกติช้างจะกินอาหาร 10% ของน้ำหนักตัว ถ้าช้างน้ำหนัก 3,000 กิโลกรัม ต้องกินอาหารอย่างน้อย 300 กิโลกรัม ต่อวัน ช้างจะมีอาหารกินเพียงพอต่อการดำรงชีวิต ให้ผ่านพ้นช่วงวิกฤติโควิด -19 ไปได้ 

อาหารของช้างที่โครงการจะจัดซื้อในแต่ละวัน ประกอบด้วย

หญ้าเนเปียร์
ต้นข้าวโพด
ผลไม้ตามฤดูกาล หลักๆ คือ กล้วย แตงโม อ้อย ข้าวโพดหวาน ฟักทอง มะละกอสุก
ข้าวปั้น/หรือข้าวต้มมัด สำหรับช้างแก่ (ประกอบไปด้วย ข้าวเหนียว รำข้าว กล้วยสุก เกลือ ข้าวโพด เกล็ดขนมปังคลุกเคล้า ให้เข้ากัน จากนั้นนำไปนึ่งให้สุก )
อาหารเสริม สำหรับช้างแก่ เป็นอาหารแห้งอัดเม็ด มีส่วนผสมของวิตามิน เกลือแร่และสารอาหารต่างๆที่ช้างต้องการ
ถ้าช้างแก่ หรือช้างไม่สบาย ต้องมีการให้ยารักษาทุกวัน ที่มูลนิธิอนุรักษ์ช้างและสิ่งแวดล้อม มีสัตวแพทย์ที่ดูแลช้าง 2 ท่าน และผู้สัตวแพทย์อีก 3 ท่าน',
'ช้างที่ได้รับการอุปการะ มีอาหารกินเพียงพอต่อการดำรงชีวิตในช่วงวิกฤติโควิด-19',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fpj7.jpg?alt=media&token=aa795820-8f87-4f50-b59b-bfe8bfe04afd',
'bay','8889892','Chan Chan','fundraising','n','','2021-03-02','2021-04-25',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Elephant Family Org','pranpranpranofficial@gmail.com','animal','recp_test_5njhmf93gltwqb9i0tz','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400),

('ส่งน้ำใจดับไฟป่า สนับสนุนเจ้าหน้าที่พิทักษ์ป่า และช่วยเหลือสัตว์ป่าให้รอดจากเปลวเพลิง',
'สนับสนุนอุปกรณ์การดับไฟและช่วยเหลือสัตว์ป่าให้กับผู้พิทักษ์ป่าทั่วประเทศ ร่วมช่วยกันแสดงพลังว่าคนในสังคมเห็นความสำคัญและอยู่เคียงข้างผู้พิทักษ์ป่า ในการปฏิบัติภารกิจรักษาไว้ซึ่งทรัพยากรธรรมชาติและสิ่งแวดล้อมเพื่อคนไทยและประทศไทยของเรา', 
'โครงการส่งน้ำใจดับไฟป่า สนับสนุนเจ้าหน้าที่พิทักษ์ป่า และช่วยเหลือสัตว์ป่าให้รอดจากเปลวเพลิง จัดทำขึ้นเพื่อเป็นช่องทางหนึ่ง ที่ให้คนสังคมได้สนับสนุน ให้กำลังใจเจ้าหน้าที่ผู้พิทักษ์ป่า ที่ต้องกระทำหน้าที่อันยากลำบาก ผจญเพลิงดับไฟป่าในระยะเวลาตั้งแต่เดือนกุมภาพันธ์ – พฤษภาคม ของทุกปี สถานการณ์ไฟป่าของประเทศไทยก่อให้เกิดความเสียหายแก่ป่าไม้ และสัตว์ป่า รวมทั้งสุขภาพพลานามัย ของประชาชนที่ได้รับผลกระทบจากวิกฤติหมอกควันอย่างต่อเนื่องและมีแนวโน้มรุนแรงมากขึ้น นอกจากนี้การเกิดไฟป่าแต่ละครั้ง มีสัตว์ป่าโดยเฉพาะลูกสัตว์ป่าหลายชนิด จำนวนมากต้องถูกไฟป่าครอกตาย หรือ บาดเจ็บ พลัดหลงจากแม่จากการหนีไฟ เจ้าหน้าที่ต้องทำงานหนักทั้งกลางวัน กลางคืน สับเปลี่ยนหมุนเวียนกำลังเพื่อเร่งดับไฟป่าและช่วยเหลือสัตว์ป่า การส่งกำลังใจในรูปแบบของอุปกรณ์ที่จำเป็นในการปฏิบัติงาน เป็นกำลังใจที่มีคุณค่ายิ่ง อย่างน้อยก็แสดงถึงว่าคนในสังคมเห็นความสำคัญและอยู่เคียงข้างผู้พิทักษ์ป่า ในการปฏิบัติภารกิจรักษาไว้ซึ่งทรัพยากรธรรมชาติและสิ่งแวดล้อมเพื่อคนไทยและประทศไทยของเรา
ในรอบหลายปีที่ผ่านมา สถานการณ์ไฟป่าของประเทศไทยก่อให้เกิดความเสียหายแก่ป่าไม้ และสัตว์ป่า รวมทั้งสุขภาพพลานามัยของประชาชนที่ได้รับผลกระทบจากวิกฤติหมอกควันอย่างต่อเนื่อง และมีแนวโน้มรุนแรงมากขึ้น โดยในปี 2563 ประเทศไทยมีจุดความร้อนสะสม จำนวนทั้งสิ้น 205,288 จุด  (ข้อมูลจากดาวเทียม Suomi NPP ระบบ VIIRS) ซึ่งมีค่าสูงสุดในเดือน มีนาคม หากแบ่งพื้นที่ ตามความรับผิดชอบการดูแลป้องกันไฟป่า จะพบว่าจุดความร้อนสะสมสูงสุดในพื้นที่ป่าอนุรักษ์ จำนวน 83,048 จุด รองลงมาเป็นพื้นที่ป่าสงวนแห่งชาติ จำนวน 53,353 จุด พื้นที่เกษตร จำนวน 36,557 จุด  พื้นที่สปก. จำนวน 17,414 จุด พื้นที่ชุมชนและอื่นๆ จำนวน 13,253 จุด และพื้นที่ริมทางหลวง 50 เมตร จำนวน 1,663 จุด ตามลำดับ 10 จังหวัดที่มีจำนวนจุดความร้อนสะสมสูงสุด ได้แก่ เชียงใหม่ แม่ฮ่องสอน ตาก กาญจนบุรี ลำปาง น่าน เชียงราย อุทัยธานี เพชรบูรณ์และกำแพงเพชร (Gistda,2020)
ในพื้นที่ป่าอนุรักษ์ 61.90 ล้านไร่ ตั้งแต่ 1 มกราคม – 31 พฤษภาคม 2563 พบว่าเกิดจุดความร้อนสะสมสูงสุดในพื้นที่ป่าอนุรักษ์ จำนวน 83,048 จุด หากประมาณการณ์ง่าย ๆ ว่า ระยะเวลา 150 วันที่เกิดไฟป่า เฉลี่ยจะมีจุดความร้อนวันละ 554 จุด หากแต่ละจุดความร้อนที่เกิดขึ้นนั้น  ต้องระดมเจ้าหน้าที่ในการดับไฟป่า เฉลี่ยจุดละ 30 คน ดังนั้นวันๆ หนึ่งต้องใช้เจ้าหน้าที่ในการดับไฟป่า  ไม่น้อยกว่า 16,620 คน ในความเป็นจริงไม่มีใครทำงานดับไฟป่าได้ต่อเนื่องตลอด 150 วัน จึงต้อง มีชุดเจ้าหน้าที่ผลัดเปลี่ยนหมุนเวียนกัน ตลอดจนเจ้าหน้าที่ฝ่ายสนับสนุนเรื่องเสบียงและอุปกรณ์ ดังนั้นอัตรากำลังในการดับไฟป่าอย่างน้อยที่สุด จึงมีเจ้าหน้าที่ต้องปฏิบัติหน้าที่ไม่น้อยกว่า 25,000 คน ในแต่ละปี ทั้งทำแนวกันไฟ เก็บใบไม้และเชื้อเพลิง ลาดตระเวนดูไฟ ดับไฟป่า สำหรับในพื้นที่อนุรักษ์สัตว์ป่า อันได้แก่เขตรักษาพันธุ์สัตว์ป่า และเขตห้ามล่าสัตว์ป่า ที่เป็นแหล่งอาศัยสำคัญของสัตว์ป่า เจ้าหน้าที่นอกจากจะต้องดับไฟป่าแล้ว ยังมีภารกิจและช่วยเหลือสัตว์ป่าให้รอดจากไฟป่าด้วย ในส่วนนี้มีเจ้าหน้าที่ปฏิบัติภารกิจ ใน 95 พื้นที่ ประมาณ 2,230 คน
ไฟป่าแต่ละครั้ง นำความสูญเสียทั้งต่อถิ่นที่อยู่อาศัยอันร่มเย็นของสัตว์ป่า ไปจนถึงการพรากชีวิตน้อย ๆ จำนวนนับไม่ถ้วนจากการที่ถูกไฟครอก เนื่องจากสัตว์ป่าตัวเล็ก ๆ และลูกสัตว์ป่า มักจะหนีไฟ ไม่ทัน อันตรายจากไฟป่าที่ส่งผลกระทบต่อสัตว์ป่านั้นมีดังนี้ 
สัตว์ป่าอาจจะโดนไฟคลอกตายในขณะเกิดเพลิงไหม้ 
ปัญหาเรื่องควันมีผลกระทบต่อสุขภาพของสัตว์ สัตว์บางส่วนไม่ได้ตายเพราะไฟป่าโดยตรงอาจจะสำลักควันตาย พอไฟมาถึงไม่มีแรงจะวิ่งหนี หรืออาจส่งผลต่อสุขภาพในระยะยาวของสัตว์ป่า
แหล่งอาหารถูกทำลาย เมื่อสัตว์สุขภาพไม่แข็งแรงแล้ว แหล่งอาหารไม่เพียงพอ แหล่งน้ำเหือดแห้ง ทำให้สุขภาพยิ่งแย่ลง สัตว์ป่าอาจป่วยตายไปในที่สุด',
'ประโยชน์ของโครงการ
เพิ่มประสิทธิภาพการควบคุมไฟป่าในพื้นที่อนุรักษ์สัตว์ป่า
ช่วยเหลือสัตว์ป่าให้ปลอดภัยจากเปลวเพลิง ในพื้นที่อนุรักษ์สัตว์ป่า
เพื่อรักษาสมดุลสิ่งแวดล้อม ลดมลพิษหมอกควัน
เพิ่มขวัญกำลังใจ และความปลอดภัยให้กับเจ้าหน้าที่',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Ffire.jpg?alt=media&token=67075e36-cd7f-410b-9217-910a535daaf5',
'scb','1111111','Somsak Manee','fundraising','n','','2021-02-02','2021-04-28',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','เจ้าหน้าที่พิทักษ์ป่า','pathdoctor@gmail.com','disaster','recp_test_5njhnn9lhxo3c8pfk7z','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400),


('สอนว่ายน้ำนักเรียนตาบอด จ.แพร่',
'สอนว่ายน้ำให้แก่นักเรียนตาบอดประมาณ 60 คนและครูอีก 10 คนเพื่อสร้างความปลอดภัยในชีวิตให้กับคนตาบอดและเด็กนักเรียนตาบอดเนื่องจากสภาพโรงเรียนอยู่ใกล้แหล่งน้ำ', 
'Survival swimming for the blind in Thailand เป็นโครงการสอนว่ายน้ำสำหรับคนตาบอดทั่วไป และเด็กนักเรียนตาบอดเพื่อเอาชีวิตรอดจากการจมน้ำ เพื่อลดอัตราเสี่ยงต่อการจมน้ำของคนตาบอด ตลอดจนเพื่อความปลอดภัยในการเดินทาง หรือการประกอบกิจกรรม ทางน้ำ และยังเป็นการสร้างโอกาสให้คนตาบอดทั่วไปและนักเรียนตาบอดได้มีโอกาสเข้าถึง การเรียนว่ายน้ำและการฝึกว่ายน้ำ ที่ถูกต้องและปลอดภัย 

ปัจจุบันอุบัติเหตุจากการจมน้ำยังเป็นสาเหตุอันดับ 1 ของการเสียชีวิตของคนไทย

10 ปีที่ผ่านมา มีเด็กจมน้ำเสียชีวิตเฉลี่ยสูงถึง 1,325 คน/ปี หรือเกือบวันละ 4 คน

แม้วันนี้การดำเนินงานรณรงค์ป้องกันเด็กจมจมน้ำของ สำนักโรคไม่ติดต่อ กรมควบคุมโรคกระทรวงสาธารณสุข และกระทรวงศึกษาธิการจะมีนโยบายให้เด็กไทยต้องว่ายน้ำเป็นทุกคน กิจกรรมว่ายน้ำเป็น แต่เราก็พบเด็กว่ายน้ำไม่เป็นอีกจำนวนมากโดยเฉพาะกลุ่มคนตาบอด เป็นกลุ่มคนที่ขาดโอกาสในการเรียนและการฝึกว่ายน้ำ ด้วยปัจจัยหลายๆอย่าง เช่น ไม่มีครูสอน ว่ายน้ำ ปัญหาในการใช้สระว่ายน้ำสาธารณะ และปัจจัยอื่นๆ ส่งผลให้คนตาบอดส่วนใหญ่ว่ายน้ำไม่เป็น    ',
'สอนว่ายน้ำให้นักเรียนคนตาบอดภายในโรงเรียนสอนคนตาบอดสันติจินตนา ให้ว่ายน้ำเป็น และครูในโรงเรีบนมีความรู้และทักษะในการช่วยเหลือคนตกน้ำ  โดยเราจะนำสระว่ายน้ำไปสอนเด็กในพื้นที่ดังกล่าว กลุ่มเป้าหมายคือ นักเรียนคนตาบอดภายในโรงเรียนไม่เกิน 60 คน และครูในโรงเรียน  10 คน',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fpj6.png?alt=media&token=e54d784f-2f42-4353-8cdf-fcf68f0f072b',
'scb','9999999','Sucha Paland','fundraising','n','','2021-03-02','2021-08-23',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Swim teach for you','swimwithusofficial@gmail.com','education','recp_test_5njhotngsny55zzx9qv','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400);


INSERT INTO projectupdate(
    upTitle,
    upDesc,
    upImage ,
    upDay,
    pjid
) VALUES ('ซื้ออุปกรณ์แอลกอฮอล์','ซื้ออุปกรณ์แอลกอฮอล์เพื่อให้บุคลากรทางการแพทย์ได้ทำความสะอาดมือทั้งก่อนและหลังพบผู้ป่วย','https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectProgress%2Fbuydoctor.jpg?alt=media&token=519df4ef-4c41-4fe0-b491-e17f36602482','2020-01-08',1),
('ประเมินทักษะการว่ายน้ำก่อนเริ่มเรียน','เมื่อวันที่ 8 มีนาคม 2021 ทางภาคีได้พาน้อง ๆ ไปทดสอบว่ายน้ำเพื่อประเมินก่อนการเริ่มเรียน','https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectProgress%2FWainam.png?alt=media&token=cdb97663-a198-4554-b0a3-a60a0fc311bb','2020-04-23',2),
('ติดตั้งสระว่ายน้ำ พร้อมให้เด็กโรงเรียนบ้านท่าลาวเรียนทักษะการว่ายน้ำ',
'เมื่อวันที่ 8 มีนาคม 2021 หลังสถานศึกษาเปิดเรียน ทางผู้จัดโครงการได้ดำเนินการเตรียมจัดโครงการสอนว่ายน้ำฟรีให้กับนักเรียนภายในโรงเรียนบ้านท่าลาว
ในช่วงระหว่างวันที่ 8 กุมภาพันธ์ ถึง วันที่ 12 กุมภาพันธ์ 2564 ได้เตรียมการปรับพื้นที่ตั้งสระว่ายน้ำและทำการติดตั้งสระว่ายน้ำ รวมถึงปรับสภาพน้ำ เพื่อเตรียมความพร้อมในการสอนว่ายน้ำ ให้กับเด็กนักเรียน ในวันจันทร์ ที่ 15 กุมภาพันธ์ 2564 เป็นต้นไป',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectProgress%2Fbuilding.jpeg?alt=media&token=c406d863-2fd7-4c50-8d0b-a76e8c3df585','2020-06-28',1);


--INPUT Demo Project
INSERT INTO project
(
    pjName,   

    pjGoal ,
    pjDesc ,
    pjBenefit ,

    pjImage ,

    pjBankType ,
    pjBankNo ,
    pjBankName,

    pjStatus ,
    pjUrgent,
    pjTerminateReason ,    
    pjStartDate ,
    pjEndDate ,
    pjAmount ,
    pjCurrentAmount,

    pjFb  ,
    pjTwt ,
    pjIG  ,

    pjOwnerType ,
    pjOwnerName ,
    pjOwnerEmail ,

    pjType ,
    recpId ,
    fdfirebaseid,

    
    pjSouvenir1 , 
    pjSouvenir2 , 
    pjSouvenir3 , 
    pjSPrice1 , 
    pjSPrice2 ,
    pjSPrice3 
    )
VALUES
(
'ร่วมทำแนวป้องกันไฟป่า ด้วยนวัตกรรมเครื่องเป่าใบไม้ไฟฟ้า โดยเครือข่ายป่าชุมชนจังหวัดลำปาง',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fautumn-outdoor-picture-grassy-plain-with-several-trees-background-clouded-sky-summer-meadow-before-rain-environment-wild-nature-landscapes-countryside-season-weather-concept.jpg?alt=media&token=57e88455-2851-46e8-8963-83afcb3ef800',
'scb','8765378','Chanik Lu','fundraising','n','','2030-03-02','2030-04-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Fire Stop','pathdoctor@gmail.com','disaster','recp_test_5njick8jfpu8hdh6o7y','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
),

(
'ฟื้นฟูป่าเขาใหญ่ 2564',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2F6780c300-0761-40ad-b729-7970ad2b4471.jpeg?alt=media&token=53f842e4-f6cf-452e-a4d4-2a4c6c734069',
'scb','577237821','Poonkasem Planukun','fundraising','n','','2030-03-02','2030-04-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Khoa Yai 2564','pathdoctor@gmail.com','nature','recp_test_5njicvprka8pxq3vw62','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
),

(
'ช่วยเหลือผู้ประสบอุบัติเหตุจากการขับรถ',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fwoman-crashed-into-car-girl-helmet.jpg?alt=media&token=6cf22f7b-c6a5-45e4-b255-bf521ebdb518',
'scb','372891739','Suchat KongKa','fundraising','n','','2030-03-02','2030-04-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Car Crash Helper 21','pathdoctor@gmail.com','accident','recp_test_5njid6yxku55je31p09','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
),

(
'ทำหมันแมวสัญจรกับมูลนิธิรักษ์แมว',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fcat-walking-street.jpg?alt=media&token=667611e6-2508-44bd-842e-d4821f178cc5',
'kbank','4828882','Chanika Cha','fundraising','n','','2030-03-02','2030-04-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Meow Mee Ka','pathdoctor@gmail.com','animal','recp_test_5njidp5bmbe4o9lv81a','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
),

(
'สร้างอาชีพ ให้เพื่อเด็ก ๆ ที่ขาดโอกาสในชุมชนคลองเตย 40 คน',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Ffemale-teacher-teaching-kids-about-disinfecting.jpg?alt=media&token=9646e696-15ad-4835-b757-e37f2afe8ec8'
,'kbank','90878283','Sanonmai Nowmar','fundraising','n','','2030-03-02','2030-04-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Educaate dekdekdek','pathdoctor@gmail.com','education','recp_test_5njieeztuijzr1xzj1d','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
),

(
'บ้านที่แข็งแรงให้ครอบครัวแม่จีี',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2F1e3f3b02-065c-4f98-8f9b-2916eb91b263.jpeg?alt=media&token=30ea6847-babf-48c0-a501-5bd39a69dcc3'
,'kbank','4828882','Konkorn Juaron','fundraising','n','','2030-03-02','2030-04-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Baan Mae Ji','pathdoctor@gmail.com','others','recp_test_5njif8fiheq6a7apk0v','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400

),

--Expired Projects
(
'ช่วยผู้ได้รับผลกระทบจากไฟป่าแม่โจ้ 2564',
'Demo', 
'Demo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fold-broken-up-car-dry-grass-field-with-trees.jpg?alt=media&token=997f34d5-5137-48b2-bfa9-93d6394eb79f',
'scb','55556666','Pompom Poonsiri','fundraising','n','','2020-03-02','2020-09-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','Fire Dubbing','pathdoctor@gmail.com','disaster','recp_test_5njilhz0y9llj9sn19v','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
),

(
'ครัวรักษ์อาหาร เสริมภูมิต้านทานชุมชนหลังวิกฤติโควิด-19',
'Demo', 
'Domo',
'Demo',
'https://firebasestorage.googleapis.com/v0/b/sharitys-d1b14.appspot.com/o/images%2FProjectPic%2Fdelivery-man-holding-paper-bag-showing-thumb-up-red-uniform.jpg?alt=media&token=85e711b3-0f5b-49bb-98fb-d95a61a7319f'
,'scb','9887778893','Kluasri Huangyai','fundraising','n','','2020-03-02','2020-09-13',200000,12000,
'www.facebook.com/SharitysPlatform/',
'www.twitter.com/Sharitys6',
'www.instagram.com/sharitys?igshid=194abrusy24lf',
'org','ครัวรักษ์อาหาร','pathdoctor@gmail.com','others','recp_test_5njim451gpt86ddtqvl','l2YhwrVN8TTdjS3X0T0mEUWMFbH3'
,'สติ๊กเกอร์ลายโครงการ','เซ็ทพวงกุญแจโครงการ','เสื้อยืดลายโครงการ',150,200,400
);
-- For test
-- drop TRIGGER terminate_expiredpj_trigger on adminterminatecheck
-- Drop function terminate_expiredpj()
-- drop table adminterminatecheck 


CREATE FUNCTION terminate_expiredpj() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE project SET pjStatus='terminated' WHERE pjEndDate <= CURRENT_DATE;
  RETURN NEW;
END;
$$;


create table adminterminatecheck(
    tcheckid SERIAL Primary Key ,
    tchecktime TIMESTAMP
);


CREATE TRIGGER terminate_expiredpj_trigger
    AFTER INSERT ON adminterminatecheck
    EXECUTE PROCEDURE terminate_expiredpj();


-- INSERT INTO adminterminatecheck (tchecktime) VALUES (CURRENT_TIMESTAMP);