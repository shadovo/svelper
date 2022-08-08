import {
	S as z,
	i as A,
	s as C,
	e as n,
	t as c,
	k as W,
	c as f,
	a as p,
	h as d,
	d as t,
	m as $,
	b as S,
	g as h,
	J as i,
	n as H,
} from '../chunks/index-c3650d4a.js';
function D(V) {
	let s, x, _, l, q, v, y, E, m, o, r, k;
	return {
		c() {
			(s = n('h1')),
				(x = c('Welcome to SvelteKit')),
				(_ = W()),
				(l = n('p')),
				(q = c('Visit ')),
				(v = n('a')),
				(y = c('kit.svelte.dev')),
				(E = c(' to read the documentation')),
				(m = W()),
				(o = n('div')),
				(r = n('p')),
				(k = c('Hello!')),
				this.h();
		},
		l(e) {
			s = f(e, 'H1', {});
			var a = p(s);
			(x = d(a, 'Welcome to SvelteKit')), a.forEach(t), (_ = $(e)), (l = f(e, 'P', {}));
			var u = p(l);
			(q = d(u, 'Visit ')), (v = f(u, 'A', { href: !0 }));
			var b = p(v);
			(y = d(b, 'kit.svelte.dev')),
				b.forEach(t),
				(E = d(u, ' to read the documentation')),
				u.forEach(t),
				(m = $(e)),
				(o = f(e, 'DIV', { class: !0 }));
			var K = p(o);
			r = f(K, 'P', { class: !0 });
			var P = p(r);
			(k = d(P, 'Hello!')), P.forEach(t), K.forEach(t), this.h();
		},
		h() {
			S(v, 'href', 'https://kit.svelte.dev'),
				S(r, 'class', 'svelte-119sq8v'),
				S(o, 'class', 'hey svelte-119sq8v');
		},
		m(e, a) {
			h(e, s, a),
				i(s, x),
				h(e, _, a),
				h(e, l, a),
				i(l, q),
				i(l, v),
				i(v, y),
				i(l, E),
				h(e, m, a),
				h(e, o, a),
				i(o, r),
				i(r, k);
		},
		p: H,
		i: H,
		o: H,
		d(e) {
			e && t(s), e && t(_), e && t(l), e && t(m), e && t(o);
		},
	};
}
function I(V) {
	return console.log('hello!'), [];
}
class R extends z {
	constructor(s) {
		super(), A(this, s, I, D, C, {});
	}
}
export { R as default };
