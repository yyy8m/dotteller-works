/* 文庫 #001 蜘蛛の糸: thumbnail */
function THUMB(c, t) {
  thumbBigFace(c, { face: facePortrait('kandata', { t: 0.3, mouth: 2, blink: 0, expr: 'angry' }), s: 3.5, light: false, rim: '#f8b048', bg: ['#1c0806', '#7c1c0c'],
    title: ['蜘蛛', 'の糸'], hook: '降りろ！俺の糸だ！', tcol: '#f8e070', hcol: '#ffffff' }, t);
  L(c, 150, 0, 150, TH, '#e8f0ff'); for (const [dx, dy] of [[-5, -3], [5, -2], [-3, 4], [4, 5]]) L(c, 150, 40, 150 + dx, 40 + dy, '#ffffff');
}
