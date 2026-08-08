import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ArrowRightLeft, 
  Smartphone, 
  Gift, 
  Hourglass, 
  Activity, 
  BarChart2, 
  Users, 
  GitMerge, 
  UserX, 
  Layers, 
  Upload, 
  Lock, 
  Store, 
  Banknote, 
  FileText, 
  Lightbulb, 
  AlertTriangle, 
  ArrowUp 
} from 'lucide-react';

interface HelpCenterScreenProps {
  onBackClick: () => void;
}

export const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ onBackClick }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleArticle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowScrollTop(scrollRef.current.scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'cat1',
      title: '1. مرحباً بك في Z Net',
      articles: [
        {
          id: 'art1',
          title: 'مفهوم وأهداف النظام',
          icon: <Info size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#E6F4F1]',
          iconTextColor: 'text-[#247A7B]',
          steps: [
            'نظام Z Net هو تطبيق ذكي مخصص لمزودي خدمات الإنترنت لتهيئة وتوزيع كروت الشبكة تلقائياً بمجرد استلام رسائل الدفع.',
            'يعمل التطبيق على أتمتة دورة المبيعات والحسابات بالكامل دون الحاجة لأي تدخل يدوي، مما يقلل الأخطاء ويسرّع صرف كروت الإنترنت للعملاء.',
            'يتصل التطبيق بقاعدة بيانات محلية آمنة (ObjectBox) تضمن معالجة البيانات بسرعة فائقة وحماية حركات الحسابات.'
          ],
          infoBox: 'صُمم هذا النظام ليعمل بشكل مستقل وبأمان تام على هاتف أندرويد واحد مخصص لاستلام رسائل التحويل وصرف الكروت.'
        },
        {
          id: 'art2',
          title: 'دورة العمل الآلية الكاملة',
          icon: <ArrowRightLeft size={20} strokeWidth={2} />,
          iconBgColor: 'bg-gray-100',
          iconTextColor: 'text-gray-500',
          steps: [
            'استقبال الرسالة: يستقبل الهاتف رسالة إشعار تحويل مالي من محفظة أو بنك معتمد (مثل محفظة جيب أو جوالي).',
            'التحليل والتعرف: يطابق محرك التحليل الرسالة مع القوالب النشطة لاستخراج المبلغ ورقم المشترك والمرجع.',
            'تسجيل قيد الإيداع: يقوم النظام تلقائياً بإنشاء قيد دائن (CREDIT) للمشترك وتحديث رصيده في الدفتر.',
            'حجز وصرف الكرت: يبحث النظام في المخزن عن أفضل كرت متاح يطابق فئة المبلغ المستلم ويحجزه ذرياً منعاً للتكرار.',
            'إرسال كود الكرت: يرسل كود الكرت برسالة SMS للعميل، ويسجل قيد مدين (DEBIT) بقيمة الكرت المسحوب من حسابه.',
            'مكافأة العروض: بعد إتمام العملية بنجاح، يقوم محرك العروض بمراجعة مشتريات العميل وتقديم كروت مجانية فور استحقاقه للعرض.'
          ]
        }
      ]
    },
    {
      id: 'cat2',
      title: '2. تهيئة التطبيق والتراخيص',
      articles: [
        {
          id: 'art3',
          title: 'التنشيط الأول وبصمة الجهاز',
          icon: <Smartphone size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#E6F4F1]',
          iconTextColor: 'text-[#247A7B]',
          steps: [
            'عند تشغيل التطبيق لأول مرة، ستقوم بإدخال البيانات الأساسية للشبكة والمشرف (الاسم، ورقم الهاتف، واسم الشبكة الظاهر للعملاء).',
            'يولد النظام تلقائياً بصمة رقمية فريدة خاصة بمكونات هاتفك (Hardware Fingerprint) لربط ملف الترخيص بالجهاز وحماية حسابك.',
            'لحفظ بصمة الجهاز والتنشيط المبدئي، يتطلب النظام اتصالاً بالإنترنت لمرة واحدة فقط للتحقق من خوادم التراخيص.'
          ],
          warningBox: 'يرتبط الترخيص ببصمة هاتفك بشكل دائم؛ في حال رغبت بنقل التطبيق لهاتف آخر، يرجى التواصل مع الدعم الفني لإلغاء الارتباط القديم.'
        },
        {
          id: 'art4',
          title: 'النسخة التجريبية وباقات التفعيل',
          icon: <Gift size={20} strokeWidth={2} />,
          iconBgColor: 'bg-gray-100',
          iconTextColor: 'text-gray-500',
          steps: [
            'باقة التجربة المجانية: يمكنك تفعيل باقة مجانية مؤقتة لتجربة محرك التحليل وصرف الكروت للعملاء دون الحاجة لشراء مفتاح.',
            'باقات التنشيط القياسية والمجموعات: يتم تنشيط التراخيص الكاملة عبر إدخال مفتاح تنشيط صالح يبدأ بـ (ZN-S-) أو (ZN-B-) أو (ZN-A-).',
            'التجديد والتمديد: يتم استخدام مفاتيح تجديد تبدأ بـ (ZN-R-) لشحن رصيد رسائل إضافية أو تمديد صلاحية الباقة الجارية.'
          ]
        },
        {
          id: 'art5',
          title: 'فترة السماح والتعطيل التلقائي',
          icon: <Hourglass size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#FCE8F3]',
          iconTextColor: 'text-[#CA5C9B]',
          steps: [
            'فترة السماح (Grace Period): عند نفاد رصيد الرسائل أو انتهاء صلاحية الترخيص، يدخل التطبيق تلقائياً في فترة سماح مدتها 7 أيام.',
            'استمرار الخدمة: خلال فترة السماح، يستمر النظام في معالجة الرسائل وصرف الكروت للعملاء بشكل طبيعي دون توقف.',
            'التنبيهات: يظهر شريط تنبيه ملون أعلى لوحة التحكم يوضح عدد الأيام المتبقية قبل التعطيل الكلي للخدمة.'
          ],
          warningBox: 'بمجرد انتهاء فترة السماح (7 أيام) دون تجديد الترخيص، سيتوقف محرك التحليل وصرف الكروت كلياً حتى يتم إدخال مفتاح تجديد.'
        }
      ]
    },
    {
      id: 'cat3',
      title: '3. لوحة التحكم وإحصائيات التشغيل',
      articles: [
        {
          id: 'art6',
          title: 'مراقبة الخدمة في الخلفية',
          icon: <Activity size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#E6F4F1]',
          iconTextColor: 'text-[#247A7B]',
          steps: [
            'خدمة الخلفية (Foreground Service): يعمل محرك Z Net كخدمة أساسية في خلفية النظام لضمان عدم إيقافه من قبل نظام أندرويد.',
            'استمرار المعالجة: يستمر التطبيق في التقاط ومعالجة رسائل التحويل وصرف الكروت حتى عند إغلاق واجهة التطبيق بالكامل.',
            'حالة الخدمة: يعرض النظام مؤشراً لحالة الخدمة في لوحة التحكم، بالإضافة لإشعار دائم أعلى شاشة الهاتف، ويمكن إيقاف الخدمة يدوياً أو عمل "مزامنة قسرية".'
          ],
          infoBox: 'يمكنك النقر على الإشعار الدائم الخاص بالتطبيق للعودة السريعة إلى لوحة التحكم في أي وقت.'
        },
        {
          id: 'art7',
          title: 'مؤشرات المبيعات والمخزون',
          icon: <BarChart2 size={20} strokeWidth={2} />,
          iconBgColor: 'bg-gray-100',
          iconTextColor: 'text-gray-500',
          steps: [
            'مبيعات اليوم والشهر: تعرض لوحة التحكم مؤشرات مالية سريعة لقيمة المبيعات الإجمالية وعدد الكروت الصادرة اليوم وخلال الشهر.',
            'إحصائيات المخزون: تظهر واجهة لوحة التحكم قائمة ملونة بكافة الفئات النشطة للنظام وكميات الكروت المتاحة بكل فئة.',
            'مراقبة الأرصدة: توضح اللوحة إجمالي الديون المستحقة على نقاط البيع وإجمالي الأرصدة المودعة للعملاء المباشرين.'
          ]
        }
      ]
    },
    {
      id: 'cat4',
      title: '4. إدارة العملاء والمشتركين',
      articles: [
        {
          id: 'art8',
          title: 'المعرفات المتعددة للمشترك',
          icon: <Users size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#E6F4F1]',
          iconTextColor: 'text-[#247A7B]',
          steps: [
            'يسجل النظام الحساب الرئيسي للمشترك برقم هاتفه الأساسي ليكون المرجع للقيود المالية ورسائل استلام الكروت.',
            'لضمان التعرف التلقائي عند تحويل العميل من حسابات مختلفة، يدعم النظام ربط العميل بـ (معرفات متعددة).',
            'تشمل هذه المعرفات أرقام الهواتف البديلة، أو أرقام حسابات المحافظ (Alternative Numbers)، أو حتى أسماء المرسلين البنكيين.'
          ],
          infoBox: 'يمكنك إضافة وتعديل معرفات العميل من خلال واجهة كشف حساب العميل لتسهيل التعرف التلقائي عليه عند أي حوالة.'
        },
        {
          id: 'art9',
          title: 'دمج الحسابات وتوحيد السجلات',
          icon: <GitMerge size={20} strokeWidth={2} />,
          iconBgColor: 'bg-gray-100',
          iconTextColor: 'text-gray-500',
          steps: [
            'عند محاولة ربط معرف هاتف مسجل مسبقاً لحساب آخر، سيقوم النظام بعرض خيار دمج الحسابين (Consolidation).',
            'يعرض النظام مقارنة تفصيلية بين الحسابين تشمل: الرصيد الحالي، وعدد العمليات، وتاريخ آخر حركة حسابية.',
            'عند تأكيد الدمج، يتم توحيد كافة معرفات العميلين تحت الحساب الرئيسي ونقل كامل الحركات الدفترية والأرصدة التراكمية إليه.',
            'تُحفظ تفاصيل عملية الدمج بالكامل في سجل دمج المشتركين (Customer Merge Log) بشكل دائم لأغراض المراجعة والتأكد.'
          ],
          warningBox: 'عملية دمج الحسابات نهائية ولا يمكن التراجع عنها؛ حيث يتم حذف الحساب الفرعي تماماً وضم كامل بياناته للحساب الرئيسي.'
        },
        {
          id: 'art10',
          title: 'القائمة السوداء للعملاء المحظورين',
          icon: <UserX size={20} strokeWidth={2} />,
          iconBgColor: 'bg-red-100',
          iconTextColor: 'text-red-500',
          steps: [
            'يمكنك حظر أي رقم أو عميل من التعامل مع النظام يدوياً عن طريق إضافته إلى "شاشة الحظر والقائمة السوداء".',
            'بمجرد حظر العميل، سيقوم النظام تلقائياً بتجاهل أي حوالات مالية واردة منه وتسجيلها فوراً كرسالة مرفوضة.',
            'لا تؤثر عملية الحظر على رصيد العميل الحالي المسجل بالدفتر، وتمنع فقط إجراء المعاملات وصرف الكروت آلياً.'
          ]
        }
      ]
    },
    {
      id: 'cat5',
      title: '5. فئات الكروت ومستودع المخزون',
      articles: [
        {
          id: 'art11',
          title: 'إعداد الفئات المالية والعمولة',
          icon: <Layers size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#E6F4F1]',
          iconTextColor: 'text-[#247A7B]',
          steps: [
            'يمكنك إنشاء فئات الكروت وتحديد قيمتها المالية (سعر البيع الافتراضي للمشترك) من شاشة "الفئات".',
            'لكل فئة، يمكنك تحديد لون وأيقونة مخصصة للتمييز السريع في الواجهات والتقارير ومراقبة المخزون.',
            'يتيح لك خيار "نسبة عمولة نقطة البيع" تحديد نسبة الخصم الممنوحة لنقاط البيع التجارية عند صرف الكروت من حساباتهم.'
          ]
        },
        {
          id: 'art12',
          title: 'الاستيراد الجماعي للمخزن',
          icon: <Upload size={20} strokeWidth={2} />,
          iconBgColor: 'bg-gray-100',
          iconTextColor: 'text-gray-500',
          steps: [
            'يوفر مستودع الكروت آلية استيراد جماعية متطورة تتيح شحن مخزنك بآلاف الكروت بلمسة واحدة.',
            'يدعم التطبيق قراءة واستخراج أكواد الكروت وتصنيفها آلياً من ملفات Excel أو CSV أو ملفات PDF المطبوعة وتجزئتها.',
            'أثناء الاستيراد، يقوم النظام بفحص الأكواد المكررة وتجاهلها تلقائياً لضمان عدم إدخال كروت مكررة في المخزن.'
          ]
        },
        {
          id: 'art13',
          title: 'منع البيع المزدوج والحجز الذري',
          icon: <Lock size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#FCE8F3]',
          iconTextColor: 'text-[#CA5C9B]',
          steps: [
            'يستخدم النظام آلية حجز كروت ذرية آمنة (Atomic Reservation) عند مطابقة المبيعات.',
            'بمجرد التحقق من صحة الحوالة المالية، يتم إغلاق المعاملة وحجز الكرت المخصص للعميل فوراً على مستوى قاعدة البيانات.',
            'يمنع هذا التصميم حدوث أي تداخل حسابي أو بيع مكرر لنفس كود الكرت لأكثر من مشترك، حتى في أوقات الضغط العالي للشبكة.'
          ]
        }
      ]
    },
    {
      id: 'cat6',
      title: '6. نقاط البيع والتسويات والتحصيل',
      articles: [
        {
          id: 'art14',
          title: 'حسابات نقاط البيع وتراكم المستحقات',
          icon: <Store size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#E6F4F1]',
          iconTextColor: 'text-[#247A7B]',
          steps: [
            'نقاط البيع هي الحسابات التجارية التي تقوم بإعادة بيع الكروت للمشتركين وتحصل على عمولة محددة.',
            'تسجل مبيعات نقاط البيع كأرصدة مستحقة للشبكة بذمتهم (ديون/مبيعات)، وتتراكم في كشف حساباتهم كقيود مدينة.',
            'يمكن للمشرف تحديد نسبة خصم أو عمولة خاصة بكل نقطة بيع أو على مستوى فئات الكروت.'
          ]
        },
        {
          id: 'art15',
          title: 'تسجيل التسويات المالية والتحصيلات',
          icon: <Banknote size={20} strokeWidth={2} />,
          iconBgColor: 'bg-gray-100',
          iconTextColor: 'text-gray-500',
          steps: [
            'عند تحصيل مبالغ نقدية من نقطة البيع، يتم تسجيل "تسوية مالية" (Settlement) بقيمة المبلغ المستلم لتخفيض المديونية.',
            'يمكن تسجيل التسوية يدوياً من شاشة تفاصيل حساب نقطة البيع بالضغط على زر "تسجيل تسوية".',
            'يقوم النظام تلقائياً بإنشاء قيد مالي دائن (CREDIT) لنقطة البيع يوضح تاريخ التسوية والمبلغ والملاحظات.'
          ]
        },
        {
          id: 'art16',
          title: 'تصدير ومشاركة كشف الحساب (PDF)',
          icon: <FileText size={20} strokeWidth={2} />,
          iconBgColor: 'bg-[#FCE8F3]',
          iconTextColor: 'text-[#CA5C9B]',
          steps: [
            'يمكنك تصدير كشف حساب تفصيلي لنقطة البيع بصيغة PDF ومشاركته معهم عبر الواتساب أو وسائل التواصل.',
            'يتيح خيار التصدير تحديد فترة زمنية مخصصة (من تاريخ / إلى تاريخ) لفلترة الحركات والقيود المطلوبة.',
            'يحتوي كشف الحساب المصدر على تفاصيل كافة المبيعات والتسويات والرصيد النهائي المستحق.'
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-full h-full bg-[#F6F8F9] flex flex-col overflow-hidden relative" dir="rtl">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-4 z-10 shrink-0">
        <button 
          className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-gray-700 border border-gray-100 shadow-sm active:scale-95 transition-transform"
        >
          <Search size={22} strokeWidth={2} />
        </button>
        
        <div className="flex flex-col items-center">
          <h1 className="text-[19px] font-bold text-[#1A202C]">مركز المساعدة</h1>
          <span className="text-[13px] text-gray-500 font-medium mt-0.5">دليل الاستخدام والأسئلة الشائعة</span>
        </div>

        <button 
          onClick={onBackClick}
          className="w-11 h-11 flex items-center justify-center text-[#1A202C] active:scale-95 transition-transform"
        >
          <ArrowRight size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24"
      >
        {categories.map((category) => (
          <div key={category.id} className="mb-6">
            <h2 className="text-[15px] font-bold text-[#247A7B] mb-3 px-2">
              {category.title}
            </h2>
            
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
              {category.articles.map((article, index) => {
                const isExpanded = expandedIds.has(article.id);
                const isLast = index === category.articles.length - 1;
                
                return (
                  <div key={article.id} className={`flex flex-col ${!isLast ? 'border-b border-gray-50' : ''}`}>
                    {/* Header Row */}
                    <button 
                      onClick={() => toggleArticle(article.id)}
                      className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors w-full text-right"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${article.iconBgColor} ${article.iconTextColor} shrink-0`}>
                          {article.icon}
                        </div>
                        <span className={`text-[15px] font-bold ${isExpanded ? 'text-[#247A7B]' : 'text-[#1A202C]'} flex-1`}>
                          {article.title}
                        </span>
                      </div>
                      <div className="shrink-0 text-gray-400">
                        {isExpanded ? <ChevronUp size={20} strokeWidth={2.5} className="text-[#247A7B]" /> : <ChevronDown size={20} strokeWidth={2.5} />}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 pb-5 pt-1 animate-in slide-in-from-top-2 fade-in duration-200">
                        
                        {/* Steps */}
                        <div className="space-y-4">
                          {article.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start space-x-3 space-x-reverse">
                              <div className="w-6 h-6 rounded-full bg-[#E6F4F1] flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[13px] font-bold text-[#247A7B]">{stepIndex + 1}</span>
                              </div>
                              <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Info Box */}
                        {article.infoBox && (
                          <div className="mt-5 bg-[#F0F9F8] border border-[#E6F4F1] rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
                            <Lightbulb size={20} strokeWidth={2} className="text-[#247A7B] shrink-0 mt-0.5" />
                            <p className="text-[13.5px] text-[#247A7B] leading-relaxed font-bold">
                              {article.infoBox}
                            </p>
                          </div>
                        )}

                        {/* Warning Box */}
                        {article.warningBox && (
                          <div className="mt-5 bg-[#FEF2F2] border border-[#FEE2E2] rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
                            <AlertTriangle size={20} strokeWidth={2} className="text-red-500 shrink-0 mt-0.5" />
                            <p className="text-[13.5px] text-red-600 leading-relaxed font-bold">
                              {article.warningBox}
                            </p>
                          </div>
                        )}
                        
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top FAB */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="absolute bottom-6 left-6 w-14 h-14 bg-[#CA5C9B] rounded-[20px] flex items-center justify-center text-white shadow-lg shadow-[#CA5C9B]/30 z-20 active:scale-95 transition-all animate-in zoom-in-95 duration-200"
        >
          <ArrowUp size={28} strokeWidth={2.5} />
        </button>
      )}

    </div>
  );
};
