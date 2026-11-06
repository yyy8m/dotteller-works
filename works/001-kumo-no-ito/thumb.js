/* 文庫 #001 蜘蛛の糸: thumbnail */
function THUMB(c, t) {
  // the silver thread hangs down behind him, from the top edge
  thumbBigFace(c, { face: facePortrait('kandata', { t: 0.3, mouth: 2, blink: 0, expr: 'angry' }), s: 3.5, rim: '#f8a040', rimA: 0.6, bg: ['#1c0806', '#7c1c0c'],
    title: ['蜘蛛', 'の糸'], hook: '降りろ！俺の糸だ！', tcol: '#f8e070', hbg: '#8c1c0c' }, t);
}
