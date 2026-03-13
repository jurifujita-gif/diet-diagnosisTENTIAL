import React from 'react';
import { useState } from 'react';

const ADMIN_PASSWORD = 'admin1234';
const STORAGE_KEY = 'diet-diag-results';

const SCORE_TABLE = [
  [
    '朝、すっきりと目覚めて「よく眠れた」と感じることが多いですか？',
    'はい',
    0,
    1,
    0,
  ],
  [
    '朝、すっきりと目覚めて「よく眠れた」と感じることが多いですか？',
    '時々',
    1,
    0,
    1,
  ],
  [
    '朝、すっきりと目覚めて「よく眠れた」と感じることが多いですか？',
    'いいえ',
    3,
    0,
    2,
  ],
  ['毎日の就寝時間や起床時間はだいたい決まっていますか？', 'はい', 0, 1, 0],
  ['毎日の就寝時間や起床時間はだいたい決まっていますか？', '時々', 1, 0, 0],
  ['毎日の就寝時間や起床時間はだいたい決まっていますか？', 'いいえ', 3, 0, 0],
  ['普段の平均的な睡眠時間は何時間くらいですか？', '５時間未満', 1, 3, 0],
  ['普段の平均的な睡眠時間は何時間くらいですか？', '５～７時間', 0, 0, 1],
  ['普段の平均的な睡眠時間は何時間くらいですか？', '７時間以上', 0, 0, 2],
  ['日常生活で、意識的に体を動かしていますか？', 'はい', 0, 2, 0],
  ['日常生活で、意識的に体を動かしていますか？', '時々', 1, 1, 1],
  ['日常生活で、意識的に体を動かしていますか？', 'いいえ', 3, 0, 3],
  ['週に1回以上、30分以上の運動をしていますか？', 'はい', 0, 3, 0],
  ['週に1回以上、30分以上の運動をしていますか？', '時々', 0, 1, 0],
  ['週に1回以上、30分以上の運動をしていますか？', 'いいえ', 3, 0, 3],
  [
    '移動の際、階段とエスカレーター（またはエレベーター）、どちらを選ぶことが多いですか？',
    '階段',
    0,
    2,
    0,
  ],
  [
    '移動の際、階段とエスカレーター（またはエレベーター）、どちらを選ぶことが多いですか？',
    'どちらも',
    0,
    1,
    1,
  ],
  [
    '移動の際、階段とエスカレーター（またはエレベーター）、どちらを選ぶことが多いですか？',
    'エスカレーターまたはエレベーター',
    2,
    0,
    2,
  ],
  ['朝食を毎日食べる習慣がありますか？', 'はい', 0, 2, 0],
  ['朝食を毎日食べる習慣がありますか？', '時々', 1, 1, 1],
  ['朝食を毎日食べる習慣がありますか？', 'いいえ', 3, 0, 3],
  ['食事の代わりに間食をすることがありますか？', 'はい', 2, 0, 3],
  ['食事の代わりに間食をすることがありますか？', '時々', 1, 1, 1],
  ['食事の代わりに間食をすることがありますか？', 'いいえ', 0, 0, 0],
  ['主食（ごはん、パンなど）を抜くことがありますか？', 'はい', 3, 0, 1],
  ['主食（ごはん、パンなど）を抜くことがありますか？', '時々', 1, 0, 0],
  ['主食（ごはん、パンなど）を抜くことがありますか？', 'いいえ', 0, 0, 0],
  [
    'ストレスを感じた時や疲れた時、ドカ食いや衝動的に甘いものを大量に食べることがありますか？',
    'はい',
    3,
    0,
    2,
  ],
  [
    'ストレスを感じた時や疲れた時、ドカ食いや衝動的に甘いものを大量に食べることがありますか？',
    '時々',
    1,
    0,
    1,
  ],
  [
    'ストレスを感じた時や疲れた時、ドカ食いや衝動的に甘いものを大量に食べることがありますか？',
    'いいえ',
    0,
    0,
    0,
  ],
  ['[集中力に欠ける]', '非常に該当する', 2, 0, 1],
  ['[集中力に欠ける]', 'やや該当する', 1, 1, 1],
  ['[集中力に欠ける]', '該当しない', 0, 0, 0],
  ['[日中の眠気が強い]', '非常に該当する', 3, 1, 2],
  ['[日中の眠気が強い]', 'やや該当する', 1, 1, 1],
  ['[日中の眠気が強い]', '該当しない', 0, 0, 0],
  ['[身体がだるい・重い]', '非常に該当する', 3, 2, 3],
  ['[身体がだるい・重い]', 'やや該当する', 1, 1, 1],
  ['[身体がだるい・重い]', '該当しない', 0, 0, 0],
  ['[食欲がない]', '非常に該当する', 3, 1, 0],
  ['[食欲がない]', 'やや該当する', 1, 0, 0],
  ['[食欲がない]', '該当しない', 0, 0, 0],
  ['[寝落ちする]', '非常に該当する', 0, 3, 1],
  ['[寝落ちする]', 'やや該当する', 0, 1, 1],
  ['[寝落ちする]', '該当しない', 0, 0, 0],
  ['[緊張感が強い]', '非常に該当する', 1, 3, 0],
  ['[緊張感が強い]', 'やや該当する', 1, 1, 0],
  ['[緊張感が強い]', '該当しない', 0, 0, 0],
  ['[なかなか寝付けない]', '非常に該当する', 2, 1, 0],
  ['[なかなか寝付けない]', 'やや該当する', 1, 0, 0],
  ['[なかなか寝付けない]', '該当しない', 0, 0, 0],
  ['[睡眠中にしょっちゅう目が覚める]', '非常に該当する', 2, 1, 1],
  ['[睡眠中にしょっちゅう目が覚める]', 'やや該当する', 1, 0, 1],
  ['[睡眠中にしょっちゅう目が覚める]', '該当しない', 0, 0, 0],
  ['[イライラすることが多い]', '非常に該当する', 3, 1, 1],
  ['[イライラすることが多い]', 'やや該当する', 1, 1, 1],
  ['[イライラすることが多い]', '該当しない', 0, 0, 0],
];

const QUESTIONS = [
  {
    key: 'sleep_feel',
    label: '朝、すっきりと目覚めて「よく眠れた」と感じることが多いですか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'sleep_rhythm',
    label: '毎日の就寝時間や起床時間はだいたい決まっていますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'sleep_hours',
    label: '普段の平均的な睡眠時間は何時間くらいですか？',
    opts: ['５時間未満', '５～７時間', '７時間以上'],
  },
  {
    key: 'move_daily',
    label: '日常生活で、意識的に体を動かしていますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'exercise',
    label: '週に1回以上、30分以上の運動をしていますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'stairs',
    label:
      '移動の際、階段とエスカレーター（またはエレベーター）、どちらを選ぶことが多いですか？',
    opts: ['階段', 'どちらも', 'エスカレーターまたはエレベーター'],
  },
  {
    key: 'breakfast',
    label: '朝食を毎日食べる習慣がありますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'snack_replace',
    label: '食事の代わりに間食をすることがありますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'skip_staple',
    label: '主食（ごはん、パンなど）を抜くことがありますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'binge',
    label:
      'ストレスを感じた時や疲れた時、ドカ食いや衝動的に甘いものを大量に食べることがありますか？',
    opts: ['はい', '時々', 'いいえ'],
  },
  {
    key: 'condition',
    label: '直近1～2週間の心身の状態について教えてください',
    isMulti: true,
    subs: [
      { key: 'focus', label: '集中力に欠ける' },
      { key: 'sleepy', label: '日中の眠気が強い' },
      { key: 'heavy', label: '身体がだるい・重い' },
      { key: 'appetite', label: '食欲がない' },
      { key: 'fallasleep', label: '寝落ちする' },
      { key: 'tense', label: '緊張感が強い' },
      { key: 'insomnia', label: 'なかなか寝付けない' },
      { key: 'wakeup', label: '睡眠中にしょっちゅう目が覚める' },
      { key: 'irritate', label: 'イライラすることが多い' },
    ],
    opts: ['非常に該当する', 'やや該当する', '該当しない'],
  },
];

const TYPE_INFO = {
  Aggressive: {
    emoji: '🔥',
    color: '#e53e3e',
    bg: '#fff5f5',
    border: '#feb2b2',
    title: 'Aggressiveタイプ',
    features: [
      '朝は苦手でぎりぎりまで寝ていたいが、起きても疲れが取れていない',
      '朝食はおなかが空いていないので食べないことが多い',
      '午前中もすっきりしないが午後も眠くなるのが心配で食事は控えめにする',
      '間食をすることが多い',
      '太るのが心配なので夕食も主食を抜いたり、偏りがち',
      'たまに衝動的にドカ食いや甘いものを大量に食べることがある',
    ],
    nutrients: [
      { name: '鉄分＋葉酸', desc: '朝起きられない原因の貧血改善' },
      { name: 'ビタミンB2', desc: '細胞再生、脂質エネルギー利用' },
      {
        name: 'ビタミンD＋カルシウム',
        desc: '骨や歯の形成・精神安定。合わせて摂取で吸収UP',
      },
      { name: 'ビタミンB12', desc: '貧血改善' },
      {
        name: 'ビタミンC',
        desc: '免疫活性化・風邪予防、コラーゲン生成、栄養素の吸収率UP',
      },
    ],
  },
  Recovery: {
    emoji: '💚',
    color: '#2e9c5e',
    bg: '#f0faf4',
    border: '#9ae6b4',
    title: 'Recoveryタイプ',
    features: [
      '出勤前から運動し、日中は基本的にエネルギッシュに活動し元気',
      '食事もしっかり摂る意識はあるが、仕事の状況に左右されることがある',
      '活動量に対して食事量が足りていない',
      '全力で取り組むため日中は活動的だが、眠気を飛ばすカフェインが欠かせない',
      '終業時間が遅く、夕方以降も運動や飲み会などスケジュールはパンパン',
      '睡眠時間は短く、疲れているので寝落ちして就寝することもしばしば',
    ],
    nutrients: [
      {
        name: 'ビタミンB1＋アリシン',
        desc: '糖質のエネルギー利用。合わせて摂取で吸収率UP',
      },
      { name: 'アスパラギン酸', desc: '疲労物質（乳酸）除去、免疫活性化' },
      { name: 'タウリン', desc: '肝臓を助け、疲労回復' },
      {
        name: 'ビタミンC',
        desc: '免疫活性化・風邪予防、コラーゲン生成、栄養素の吸収率UP',
      },
      {
        name: 'ビタミンA（βカロテン）',
        desc: '目の疲労回復、粘膜の保護で風邪予防',
      },
      { name: '酢', desc: '疲労回復・血行促進' },
    ],
  },
  Antioxidant: {
    emoji: '✨',
    color: '#6b46c1',
    bg: '#faf5ff',
    border: '#d6bcfa',
    title: 'Antioxidantタイプ',
    features: [
      '運動不足や活動量が少ない',
      '最近急激に身体の変化を感じている',
      'お酒や食べることが好きで、ついつい飲みすぎ・食べすぎてしまう',
      'できれば楽して痩せたい',
      '朝食はおなかが空いていない、または食べる習慣がない',
      'サプリメントや健康器具など色々試しては続かないことが多い',
      '中途覚醒が多い',
    ],
    nutrients: [
      { name: 'ビタミンE', desc: '老化予防、血行促進、冷え・肩こり改善' },
      { name: 'ビタミンB2', desc: '細胞再生、脂質エネルギー利用' },
      {
        name: 'ビタミンD＋カルシウム',
        desc: '骨や歯の形成・精神安定。合わせて摂取で吸収UP',
      },
      { name: 'カリウム', desc: 'むくみ対策、血圧低下' },
      { name: '発酵食品＋食物繊維', desc: '腸内環境を整える、免疫活性化' },
    ],
  },
};

const getScore = (q, a) => {
  const r = SCORE_TABLE.find((x) => x[0] === q && x[1] === a);
  return r ? { A: r[2], R: r[3], X: r[4] } : { A: 0, R: 0, X: 0 };
};

// localStorage helpers
const saveResult = (record) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error(e);
  }
};
const loadResults = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};
const clearResults = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default function App() {
  const [mode, setMode] = useState('home');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiAns, setMultiAns] = useState({});
  const [scores, setScores] = useState({ A: 0, R: 0, X: 0 });
  const [savedResults, setSavedResults] = useState([]);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);

  const totalSteps = QUESTIONS.length;
  const current = QUESTIONS[step - 1];
  const P = {
    primary: '#2e9c5e',
    sub: '#718096',
    text: '#2d3748',
    border: '#c6f6d5',
    bg: '#f0faf4',
  };

  const addScore = (s) =>
    setScores((prev) => ({
      A: prev.A + s.A,
      R: prev.R + s.R,
      X: prev.X + s.X,
    }));

  const handleSimple = (opt) => {
    addScore(getScore(current.label, opt));
    setAnswers((prev) => ({ ...prev, [current.key]: opt }));
    setStep(step + 1);
    if (step === totalSteps)
      finishQuiz({ ...answers, [current.key]: opt }, scores);
  };

  const handleMultiNext = () => {
    const newScores = { ...scores };
    current.subs.forEach((sub) => {
      const ans = multiAns[sub.key];
      if (ans) {
        const s = getScore(`[${sub.label}]`, ans);
        newScores.A += s.A;
        newScores.R += s.R;
        newScores.X += s.X;
      }
    });
    setScores(newScores);
    finishQuiz(answers, newScores);
  };

  const finishQuiz = (ans, sc) => {
    const max = Math.max(sc.A, sc.R, sc.X);
    const type =
      sc.A === max ? 'Aggressive' : sc.R === max ? 'Recovery' : 'Antioxidant';
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}`;
    saveResult({ date: dateStr, type, A: sc.A, R: sc.R, X: sc.X });
    setStep(totalSteps + 1);
    setMode('result');
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setMultiAns({});
    setScores({ A: 0, R: 0, X: 0 });
    setMode('home');
  };

  const getResult = () => {
    const max = Math.max(scores.A, scores.R, scores.X);
    return scores.A === max
      ? 'Aggressive'
      : scores.R === max
      ? 'Recovery'
      : 'Antioxidant';
  };

  const handleAdminLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      setPwErr(false);
      setSavedResults(loadResults());
      setMode('admin');
    } else {
      setPwErr(true);
    }
  };

  const downloadCSV = () => {
    const header = [
      '診断日時',
      'タイプ',
      'Aggressiveスコア',
      'Recoveryスコア',
      'Antioxidantスコア',
    ];
    const rows = savedResults.map((r) => [r.date, r.type, r.A, r.R, r.X]);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `食事診断_全回答_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (!window.confirm('全データを削除しますか？')) return;
    clearResults();
    setSavedResults([]);
  };

  const progress = step === 0 ? 0 : Math.min((step / totalSteps) * 100, 100);
  const Card = ({ children }) => (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: 28,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: P.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: 540 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 38 }}>🌿</div>
          <h1
            style={{
              margin: '4px 0 0',
              fontSize: 20,
              fontWeight: 700,
              color: P.primary,
            }}
          >
            あなたにおすすめパーソナライズ食事診断
          </h1>
          <p style={{ margin: '4px 0 0', color: P.sub, fontSize: 13 }}>
            Aggressive / Recovery / Antioxidant
          </p>
        </div>

        {mode === 'home' && (
          <Card>
            <p
              style={{
                color: P.text,
                fontSize: 15,
                lineHeight: 1.9,
                textAlign: 'center',
              }}
            >
              睡眠・運動・食事・心身状態に関する質問に答えて、
              <br />
              あなたにおすすめの食事をアドバイスします。
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
                margin: '20px 0',
                flexWrap: 'wrap',
                fontSize: 13,
              }}
            >
              {Object.entries(TYPE_INFO).map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: v.bg,
                    border: `1px solid ${v.border}`,
                    borderRadius: 10,
                    padding: '7px 12px',
                    color: v.color,
                    fontWeight: 600,
                  }}
                >
                  {v.emoji} {k}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setMode('quiz');
                setStep(1);
              }}
              style={{
                width: '100%',
                background: P.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                padding: '13px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 10,
              }}
            >
              診断スタート →
            </button>
            <button
              onClick={() => setMode('adminLogin')}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: P.sub,
                fontSize: 12,
                cursor: 'pointer',
                marginTop: 4,
              }}
            >
              🔒 管理者ページ
            </button>
          </Card>
        )}

        {mode === 'adminLogin' && (
          <Card>
            <h2
              style={{
                color: P.text,
                fontSize: 17,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              🔒 管理者ログイン
            </h2>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              placeholder="パスワードを入力"
              style={{
                width: '100%',
                border: `2px solid ${pwErr ? '#e53e3e' : '#e2e8f0'}`,
                borderRadius: 10,
                padding: '12px 14px',
                fontSize: 15,
                boxSizing: 'border-box',
                marginBottom: 8,
                outline: 'none',
              }}
            />
            {pwErr && (
              <p style={{ color: '#e53e3e', fontSize: 13, margin: '0 0 8px' }}>
                パスワードが違います
              </p>
            )}
            <button
              onClick={handleAdminLogin}
              style={{
                width: '100%',
                background: P.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                padding: '12px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 10,
              }}
            >
              ログイン
            </button>
            <button
              onClick={() => {
                setMode('home');
                setPw('');
                setPwErr(false);
              }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: P.sub,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              ← 戻る
            </button>
          </Card>
        )}

        {mode === 'admin' && adminAuthed && (
          <Card>
            <h2 style={{ color: P.text, fontSize: 17, marginBottom: 4 }}>
              📊 管理者ページ
            </h2>
            <p style={{ color: P.sub, fontSize: 13, marginBottom: 16 }}>
              蓄積された診断結果：
              <strong style={{ color: P.text }}>{savedResults.length}件</strong>
            </p>
            {savedResults.length === 0 ? (
              <div
                style={{
                  background: '#f7fafc',
                  borderRadius: 10,
                  padding: 20,
                  textAlign: 'center',
                  color: P.sub,
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                まだ診断結果がありません
              </div>
            ) : (
              <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ background: '#f7fafc' }}>
                      {['#', '診断日時', 'タイプ', 'A', 'R', 'X'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '8px 10px',
                            textAlign: 'left',
                            borderBottom: '2px solid #e2e8f0',
                            color: P.sub,
                            fontWeight: 600,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {savedResults.map((r, i) => {
                      const info = TYPE_INFO[r.type];
                      return (
                        <tr
                          key={i}
                          style={{ borderBottom: '1px solid #e2e8f0' }}
                        >
                          <td style={{ padding: '8px 10px', color: P.sub }}>
                            {i + 1}
                          </td>
                          <td style={{ padding: '8px 10px', color: P.text }}>
                            {r.date}
                          </td>
                          <td style={{ padding: '8px 10px' }}>
                            <span
                              style={{
                                background: info.bg,
                                color: info.color,
                                border: `1px solid ${info.border}`,
                                borderRadius: 6,
                                padding: '2px 8px',
                                fontWeight: 700,
                                fontSize: 12,
                              }}
                            >
                              {info.emoji} {r.type}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: '8px 10px',
                              color: '#e53e3e',
                              fontWeight: 600,
                            }}
                          >
                            {r.A}
                          </td>
                          <td
                            style={{
                              padding: '8px 10px',
                              color: '#2e9c5e',
                              fontWeight: 600,
                            }}
                          >
                            {r.R}
                          </td>
                          <td
                            style={{
                              padding: '8px 10px',
                              color: '#6b46c1',
                              fontWeight: 600,
                            }}
                          >
                            {r.X}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <button
              onClick={downloadCSV}
              disabled={savedResults.length === 0}
              style={{
                width: '100%',
                background: savedResults.length === 0 ? '#cbd5e0' : P.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                padding: '13px',
                fontSize: 15,
                fontWeight: 600,
                cursor: savedResults.length === 0 ? 'not-allowed' : 'pointer',
                marginBottom: 10,
              }}
            >
              📥 全回答をCSVダウンロード（{savedResults.length}件）
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => {
                  setMode('home');
                  setAdminAuthed(false);
                  setPw('');
                }}
                style={{
                  flex: 1,
                  background: 'none',
                  border: '2px solid #e2e8f0',
                  borderRadius: 50,
                  padding: '11px',
                  fontSize: 14,
                  color: P.sub,
                  cursor: 'pointer',
                }}
              >
                ← ログアウト
              </button>
              <button
                onClick={handleClearAll}
                disabled={savedResults.length === 0}
                style={{
                  flex: 1,
                  background: 'none',
                  border: '2px solid #fed7d7',
                  borderRadius: 50,
                  padding: '11px',
                  fontSize: 14,
                  color: '#e53e3e',
                  cursor: savedResults.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                🗑 データ削除
              </button>
            </div>
          </Card>
        )}

        {mode === 'quiz' && step >= 1 && step <= totalSteps && current && (
          <Card>
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  color: P.sub,
                  marginBottom: 5,
                }}
              >
                <span>
                  {step} / {totalSteps}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div
                style={{ height: 5, background: '#e2e8f0', borderRadius: 99 }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: P.primary,
                    borderRadius: 99,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>
            {!current.isMulti ? (
              <>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: P.text,
                    marginBottom: 18,
                    lineHeight: 1.6,
                  }}
                >
                  {current.label}
                </p>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  {current.opts.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSimple(opt)}
                      style={{
                        background: '#f7fafc',
                        border: '2px solid #e2e8f0',
                        borderRadius: 12,
                        padding: '13px 16px',
                        fontSize: 14,
                        color: P.text,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = P.primary;
                        e.currentTarget.style.background = P.bg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.background = '#f7fafc';
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: P.text,
                    marginBottom: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {current.label}
                </p>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {current.subs.map((sub) => (
                    <div key={sub.key}>
                      <p
                        style={{
                          margin: '0 0 6px',
                          fontSize: 14,
                          color: P.text,
                          fontWeight: 500,
                        }}
                      >
                        ・{sub.label}
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {current.opts.map((opt) => {
                          const sel = multiAns[sub.key] === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() =>
                                setMultiAns((prev) => ({
                                  ...prev,
                                  [sub.key]: opt,
                                }))
                              }
                              style={{
                                flex: 1,
                                border: `2px solid ${
                                  sel ? P.primary : '#e2e8f0'
                                }`,
                                background: sel ? P.bg : '#f7fafc',
                                borderRadius: 10,
                                padding: '9px 4px',
                                fontSize: 12,
                                color: sel ? P.primary : P.text,
                                cursor: 'pointer',
                                fontWeight: sel ? 700 : 400,
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleMultiNext}
                  disabled={current.subs.some((s) => !multiAns[s.key])}
                  style={{
                    marginTop: 20,
                    width: '100%',
                    background: current.subs.some((s) => !multiAns[s.key])
                      ? '#cbd5e0'
                      : P.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 50,
                    padding: '13px',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: current.subs.some((s) => !multiAns[s.key])
                      ? 'not-allowed'
                      : 'pointer',
                  }}
                >
                  結果を見る →
                </button>
              </>
            )}
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  marginTop: 14,
                  background: 'none',
                  border: 'none',
                  color: P.sub,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                ← 前の質問に戻る
              </button>
            )}
          </Card>
        )}

        {mode === 'result' &&
          (() => {
            const type = getResult();
            const info = TYPE_INFO[type];
            const total = scores.A + scores.R + scores.X || 1;
            return (
              <Card>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: 52 }}>{info.emoji}</div>
                  <h2
                    style={{
                      color: info.color,
                      margin: '8px 0 4px',
                      fontSize: 22,
                    }}
                  >
                    {info.title}
                  </h2>
                </div>
                <div
                  style={{
                    background: info.bg,
                    border: `1px solid ${info.border}`,
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 10px',
                      fontWeight: 700,
                      fontSize: 14,
                      color: info.color,
                    }}
                  >
                    🧬 あなたのタイプの特徴
                  </p>
                  {info.features.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 6,
                        fontSize: 13,
                        color: P.text,
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: info.color, fontWeight: 700 }}>
                        ・
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: '#f7fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 10px',
                      fontWeight: 700,
                      fontSize: 14,
                      color: P.text,
                    }}
                  >
                    💊 強化したい栄養素
                  </p>
                  {info.nutrients.map((n, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginBottom: 8,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          background: info.color,
                          color: '#fff',
                          borderRadius: 6,
                          padding: '2px 8px',
                          fontSize: 12,
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {n.name}
                      </span>
                      <span
                        style={{ fontSize: 13, color: P.sub, lineHeight: 1.6 }}
                      >
                        {n.desc}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: '#f7fafc',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 12px',
                      fontWeight: 600,
                      fontSize: 13,
                      color: P.sub,
                    }}
                  >
                    📊 スコア内訳
                  </p>
                  {[
                    ['Aggressive', '🔥', scores.A, '#e53e3e'],
                    ['Recovery', '💚', scores.R, '#2e9c5e'],
                    ['Antioxidant', '✨', scores.X, '#6b46c1'],
                  ].map(([name, emoji, val, color]) => (
                    <div key={name} style={{ marginBottom: 10 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 13,
                          marginBottom: 4,
                          fontWeight: name === type ? 700 : 400,
                          color: name === type ? color : P.text,
                        }}
                      >
                        <span>
                          {emoji} {name}
                        </span>
                        <span>{val}pt</span>
                      </div>
                      <div
                        style={{
                          height: 8,
                          background: '#e2e8f0',
                          borderRadius: 99,
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${(val / total) * 100}%`,
                            background: color,
                            borderRadius: 99,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: 14,
                    background: '#fffaf0',
                    borderRadius: 10,
                    borderLeft: '4px solid #f7a440',
                    fontSize: 12,
                    color: P.sub,
                    marginBottom: 16,
                  }}
                >
                  ⚠️
                  この診断は一般的な参考情報です。医療上の判断は専門家にご相談ください。
                </div>
                <button
                  onClick={reset}
                  style={{
                    width: '100%',
                    background: P.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 50,
                    padding: '13px',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  もう一度診断する
                </button>
              </Card>
            );
          })()}
      </div>
    </div>
  );
}
