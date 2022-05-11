package edu.uclm.esi.wordleplayer.model;

import java.lang.reflect.Field;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "palabras")
public class Word {
	@Id
	private Integer palabraId;
	private String palabra;
	private Integer posicion;
	private Boolean a1,a2,a3,a4,a5;
	private Boolean b1,b2,b3,b4,b5;
	private Boolean c1,c2,c3,c4,c5;
	private Boolean d1,d2,d3,d4,d5;
	private Boolean e1,e2,e3,e4,e5;
	private Boolean f1,f2,f3,f4,f5;
	private Boolean g1,g2,g3,g4,g5;
	private Boolean h1,h2,h3,h4,h5;
	private Boolean i1,i2,i3,i4,i5;
	private Boolean j1,j2,j3,j4,j5;
	private Boolean k1,k2,k3,k4,k5;
	private Boolean l1,l2,l3,l4,l5;
	private Boolean m1,m2,m3,m4,m5;
	private Boolean n1,n2,n3,n4,n5;
	private Boolean gn1,gn2,gn3,gn4,gn5;
	private Boolean o1,o2,o3,o4,o5;
	private Boolean p1,p2,p3,p4,p5;
	private Boolean q1,q2,q3,q4,q5;
	private Boolean r1,r2,r3,r4,r5;
	private Boolean s1,s2,s3,s4,s5;
	private Boolean t1,t2,t3,t4,t5;
	private Boolean u1,u2,u3,u4,u5;
	private Boolean v1,v2,v3,v4,v5;
	private Boolean w1,w2,w3,w4,w5;
	private Boolean x1,x2,x3,x4,x5;
	private Boolean y1,y2,y3,y4,y5;
	private Boolean z1,z2,z3,z4,z5;
	private Boolean a, b, c, d, e, f, g, h, i, j, k, l, m, n, gn, o, p, q, r, s, t, u, v, w, x, y, z;
	
	public Integer getPalabraId() {
		return palabraId;
	}
	
	public void setPalabraId(Integer palabraId) {
		this.palabraId = palabraId;
	}
	
	public String getPalabra() {
		return palabra;
	}
	
	public void setPalabra(String palabra) {
		this.palabra = palabra;
	}
	
	public Integer getPosicion() {
		return posicion;
	}
	
	public void setPosicion(Integer posicion) {
		this.posicion = posicion;
	}

	public Boolean getA1() {
		return a1;
	}

	public void setA1(Boolean a1) {
		this.a1 = a1;
	}

	public Boolean getA2() {
		return a2;
	}

	public void setA2(Boolean a2) {
		this.a2 = a2;
	}

	public Boolean getA3() {
		return a3;
	}

	public void setA3(Boolean a3) {
		this.a3 = a3;
	}

	public Boolean getA4() {
		return a4;
	}

	public void setA4(Boolean a4) {
		this.a4 = a4;
	}

	public Boolean getA5() {
		return a5;
	}

	public void setA5(Boolean a5) {
		this.a5 = a5;
	}

	public Boolean getB1() {
		return b1;
	}

	public void setB1(Boolean b1) {
		this.b1 = b1;
	}

	public Boolean getB2() {
		return b2;
	}

	public void setB2(Boolean b2) {
		this.b2 = b2;
	}

	public Boolean getB3() {
		return b3;
	}

	public void setB3(Boolean b3) {
		this.b3 = b3;
	}

	public Boolean getB4() {
		return b4;
	}

	public void setB4(Boolean b4) {
		this.b4 = b4;
	}

	public Boolean getB5() {
		return b5;
	}

	public void setB5(Boolean b5) {
		this.b5 = b5;
	}

	public Boolean getC1() {
		return c1;
	}

	public void setC1(Boolean c1) {
		this.c1 = c1;
	}

	public Boolean getC2() {
		return c2;
	}

	public void setC2(Boolean c2) {
		this.c2 = c2;
	}

	public Boolean getC3() {
		return c3;
	}

	public void setC3(Boolean c3) {
		this.c3 = c3;
	}

	public Boolean getC4() {
		return c4;
	}

	public void setC4(Boolean c4) {
		this.c4 = c4;
	}

	public Boolean getC5() {
		return c5;
	}

	public void setC5(Boolean c5) {
		this.c5 = c5;
	}

	public Boolean getD1() {
		return d1;
	}

	public void setD1(Boolean d1) {
		this.d1 = d1;
	}

	public Boolean getD2() {
		return d2;
	}

	public void setD2(Boolean d2) {
		this.d2 = d2;
	}

	public Boolean getD3() {
		return d3;
	}

	public void setD3(Boolean d3) {
		this.d3 = d3;
	}

	public Boolean getD4() {
		return d4;
	}

	public void setD4(Boolean d4) {
		this.d4 = d4;
	}

	public Boolean getD5() {
		return d5;
	}

	public void setD5(Boolean d5) {
		this.d5 = d5;
	}

	public Boolean getE1() {
		return e1;
	}

	public void setE1(Boolean e1) {
		this.e1 = e1;
	}

	public Boolean getE2() {
		return e2;
	}

	public void setE2(Boolean e2) {
		this.e2 = e2;
	}

	public Boolean getE3() {
		return e3;
	}

	public void setE3(Boolean e3) {
		this.e3 = e3;
	}

	public Boolean getE4() {
		return e4;
	}

	public void setE4(Boolean e4) {
		this.e4 = e4;
	}

	public Boolean getE5() {
		return e5;
	}

	public void setE5(Boolean e5) {
		this.e5 = e5;
	}

	public Boolean getF1() {
		return f1;
	}

	public void setF1(Boolean f1) {
		this.f1 = f1;
	}

	public Boolean getF2() {
		return f2;
	}

	public void setF2(Boolean f2) {
		this.f2 = f2;
	}

	public Boolean getF3() {
		return f3;
	}

	public void setF3(Boolean f3) {
		this.f3 = f3;
	}

	public Boolean getF4() {
		return f4;
	}

	public void setF4(Boolean f4) {
		this.f4 = f4;
	}

	public Boolean getF5() {
		return f5;
	}

	public void setF5(Boolean f5) {
		this.f5 = f5;
	}

	public Boolean getG1() {
		return g1;
	}

	public void setG1(Boolean g1) {
		this.g1 = g1;
	}

	public Boolean getG2() {
		return g2;
	}

	public void setG2(Boolean g2) {
		this.g2 = g2;
	}

	public Boolean getG3() {
		return g3;
	}

	public void setG3(Boolean g3) {
		this.g3 = g3;
	}

	public Boolean getG4() {
		return g4;
	}

	public void setG4(Boolean g4) {
		this.g4 = g4;
	}

	public Boolean getG5() {
		return g5;
	}

	public void setG5(Boolean g5) {
		this.g5 = g5;
	}

	public Boolean getH1() {
		return h1;
	}

	public void setH1(Boolean h1) {
		this.h1 = h1;
	}

	public Boolean getH2() {
		return h2;
	}

	public void setH2(Boolean h2) {
		this.h2 = h2;
	}

	public Boolean getH3() {
		return h3;
	}

	public void setH3(Boolean h3) {
		this.h3 = h3;
	}

	public Boolean getH4() {
		return h4;
	}

	public void setH4(Boolean h4) {
		this.h4 = h4;
	}

	public Boolean getH5() {
		return h5;
	}

	public void setH5(Boolean h5) {
		this.h5 = h5;
	}

	public Boolean getI1() {
		return i1;
	}

	public void setI1(Boolean i1) {
		this.i1 = i1;
	}

	public Boolean getI2() {
		return i2;
	}

	public void setI2(Boolean i2) {
		this.i2 = i2;
	}

	public Boolean getI3() {
		return i3;
	}

	public void setI3(Boolean i3) {
		this.i3 = i3;
	}

	public Boolean getI4() {
		return i4;
	}

	public void setI4(Boolean i4) {
		this.i4 = i4;
	}

	public Boolean getI5() {
		return i5;
	}

	public void setI5(Boolean i5) {
		this.i5 = i5;
	}

	public Boolean getJ1() {
		return j1;
	}

	public void setJ1(Boolean j1) {
		this.j1 = j1;
	}

	public Boolean getJ2() {
		return j2;
	}

	public void setJ2(Boolean j2) {
		this.j2 = j2;
	}

	public Boolean getJ3() {
		return j3;
	}

	public void setJ3(Boolean j3) {
		this.j3 = j3;
	}

	public Boolean getJ4() {
		return j4;
	}

	public void setJ4(Boolean j4) {
		this.j4 = j4;
	}

	public Boolean getJ5() {
		return j5;
	}

	public void setJ5(Boolean j5) {
		this.j5 = j5;
	}

	public Boolean getK1() {
		return k1;
	}

	public void setK1(Boolean k1) {
		this.k1 = k1;
	}

	public Boolean getK2() {
		return k2;
	}

	public void setK2(Boolean k2) {
		this.k2 = k2;
	}

	public Boolean getK3() {
		return k3;
	}

	public void setK3(Boolean k3) {
		this.k3 = k3;
	}

	public Boolean getK4() {
		return k4;
	}

	public void setK4(Boolean k4) {
		this.k4 = k4;
	}

	public Boolean getK5() {
		return k5;
	}

	public void setK5(Boolean k5) {
		this.k5 = k5;
	}

	public Boolean getL1() {
		return l1;
	}

	public void setL1(Boolean l1) {
		this.l1 = l1;
	}

	public Boolean getL2() {
		return l2;
	}

	public void setL2(Boolean l2) {
		this.l2 = l2;
	}

	public Boolean getL3() {
		return l3;
	}

	public void setL3(Boolean l3) {
		this.l3 = l3;
	}

	public Boolean getL4() {
		return l4;
	}

	public void setL4(Boolean l4) {
		this.l4 = l4;
	}

	public Boolean getL5() {
		return l5;
	}

	public void setL5(Boolean l5) {
		this.l5 = l5;
	}

	public Boolean getM1() {
		return m1;
	}

	public void setM1(Boolean m1) {
		this.m1 = m1;
	}

	public Boolean getM2() {
		return m2;
	}

	public void setM2(Boolean m2) {
		this.m2 = m2;
	}

	public Boolean getM3() {
		return m3;
	}

	public void setM3(Boolean m3) {
		this.m3 = m3;
	}

	public Boolean getM4() {
		return m4;
	}

	public void setM4(Boolean m4) {
		this.m4 = m4;
	}

	public Boolean getM5() {
		return m5;
	}

	public void setM5(Boolean m5) {
		this.m5 = m5;
	}

	public Boolean getN1() {
		return n1;
	}

	public void setN1(Boolean n1) {
		this.n1 = n1;
	}

	public Boolean getN2() {
		return n2;
	}

	public void setN2(Boolean n2) {
		this.n2 = n2;
	}

	public Boolean getN3() {
		return n3;
	}

	public void setN3(Boolean n3) {
		this.n3 = n3;
	}

	public Boolean getN4() {
		return n4;
	}

	public void setN4(Boolean n4) {
		this.n4 = n4;
	}

	public Boolean getN5() {
		return n5;
	}

	public void setN5(Boolean n5) {
		this.n5 = n5;
	}

	public Boolean getGn1() {
		return gn1;
	}

	public void setGn1(Boolean gn1) {
		this.gn1 = gn1;
	}

	public Boolean getGn2() {
		return gn2;
	}

	public void setGn2(Boolean gn2) {
		this.gn2 = gn2;
	}

	public Boolean getGn3() {
		return gn3;
	}

	public void setGn3(Boolean gn3) {
		this.gn3 = gn3;
	}

	public Boolean getGn4() {
		return gn4;
	}

	public void setGn4(Boolean gn4) {
		this.gn4 = gn4;
	}

	public Boolean getGn5() {
		return gn5;
	}

	public void setGn5(Boolean gn5) {
		this.gn5 = gn5;
	}

	public Boolean getO1() {
		return o1;
	}

	public void setO1(Boolean o1) {
		this.o1 = o1;
	}

	public Boolean getO2() {
		return o2;
	}

	public void setO2(Boolean o2) {
		this.o2 = o2;
	}

	public Boolean getO3() {
		return o3;
	}

	public void setO3(Boolean o3) {
		this.o3 = o3;
	}

	public Boolean getO4() {
		return o4;
	}

	public void setO4(Boolean o4) {
		this.o4 = o4;
	}

	public Boolean getO5() {
		return o5;
	}

	public void setO5(Boolean o5) {
		this.o5 = o5;
	}

	public Boolean getP1() {
		return p1;
	}

	public void setP1(Boolean p1) {
		this.p1 = p1;
	}

	public Boolean getP2() {
		return p2;
	}

	public void setP2(Boolean p2) {
		this.p2 = p2;
	}

	public Boolean getP3() {
		return p3;
	}

	public void setP3(Boolean p3) {
		this.p3 = p3;
	}

	public Boolean getP4() {
		return p4;
	}

	public void setP4(Boolean p4) {
		this.p4 = p4;
	}

	public Boolean getP5() {
		return p5;
	}

	public void setP5(Boolean p5) {
		this.p5 = p5;
	}

	public Boolean getQ1() {
		return q1;
	}

	public void setQ1(Boolean q1) {
		this.q1 = q1;
	}

	public Boolean getQ2() {
		return q2;
	}

	public void setQ2(Boolean q2) {
		this.q2 = q2;
	}

	public Boolean getQ3() {
		return q3;
	}

	public void setQ3(Boolean q3) {
		this.q3 = q3;
	}

	public Boolean getQ4() {
		return q4;
	}

	public void setQ4(Boolean q4) {
		this.q4 = q4;
	}

	public Boolean getQ5() {
		return q5;
	}

	public void setQ5(Boolean q5) {
		this.q5 = q5;
	}

	public Boolean getR1() {
		return r1;
	}

	public void setR1(Boolean r1) {
		this.r1 = r1;
	}

	public Boolean getR2() {
		return r2;
	}

	public void setR2(Boolean r2) {
		this.r2 = r2;
	}

	public Boolean getR3() {
		return r3;
	}

	public void setR3(Boolean r3) {
		this.r3 = r3;
	}

	public Boolean getR4() {
		return r4;
	}

	public void setR4(Boolean r4) {
		this.r4 = r4;
	}

	public Boolean getR5() {
		return r5;
	}

	public void setR5(Boolean r5) {
		this.r5 = r5;
	}

	public Boolean getS1() {
		return s1;
	}

	public void setS1(Boolean s1) {
		this.s1 = s1;
	}

	public Boolean getS2() {
		return s2;
	}

	public void setS2(Boolean s2) {
		this.s2 = s2;
	}

	public Boolean getS3() {
		return s3;
	}

	public void setS3(Boolean s3) {
		this.s3 = s3;
	}

	public Boolean getS4() {
		return s4;
	}

	public void setS4(Boolean s4) {
		this.s4 = s4;
	}

	public Boolean getS5() {
		return s5;
	}

	public void setS5(Boolean s5) {
		this.s5 = s5;
	}

	public Boolean getT1() {
		return t1;
	}

	public void setT1(Boolean t1) {
		this.t1 = t1;
	}

	public Boolean getT2() {
		return t2;
	}

	public void setT2(Boolean t2) {
		this.t2 = t2;
	}

	public Boolean getT3() {
		return t3;
	}

	public void setT3(Boolean t3) {
		this.t3 = t3;
	}

	public Boolean getT4() {
		return t4;
	}

	public void setT4(Boolean t4) {
		this.t4 = t4;
	}

	public Boolean getT5() {
		return t5;
	}

	public void setT5(Boolean t5) {
		this.t5 = t5;
	}

	public Boolean getU1() {
		return u1;
	}

	public void setU1(Boolean u1) {
		this.u1 = u1;
	}

	public Boolean getU2() {
		return u2;
	}

	public void setU2(Boolean u2) {
		this.u2 = u2;
	}

	public Boolean getU3() {
		return u3;
	}

	public void setU3(Boolean u3) {
		this.u3 = u3;
	}

	public Boolean getU4() {
		return u4;
	}

	public void setU4(Boolean u4) {
		this.u4 = u4;
	}

	public Boolean getU5() {
		return u5;
	}

	public void setU5(Boolean u5) {
		this.u5 = u5;
	}

	public Boolean getV1() {
		return v1;
	}

	public void setV1(Boolean v1) {
		this.v1 = v1;
	}

	public Boolean getV2() {
		return v2;
	}

	public void setV2(Boolean v2) {
		this.v2 = v2;
	}

	public Boolean getV3() {
		return v3;
	}

	public void setV3(Boolean v3) {
		this.v3 = v3;
	}

	public Boolean getV4() {
		return v4;
	}

	public void setV4(Boolean v4) {
		this.v4 = v4;
	}

	public Boolean getV5() {
		return v5;
	}

	public void setV5(Boolean v5) {
		this.v5 = v5;
	}

	public Boolean getW1() {
		return w1;
	}

	public void setW1(Boolean w1) {
		this.w1 = w1;
	}

	public Boolean getW2() {
		return w2;
	}

	public void setW2(Boolean w2) {
		this.w2 = w2;
	}

	public Boolean getW3() {
		return w3;
	}

	public void setW3(Boolean w3) {
		this.w3 = w3;
	}

	public Boolean getW4() {
		return w4;
	}

	public void setW4(Boolean w4) {
		this.w4 = w4;
	}

	public Boolean getW5() {
		return w5;
	}

	public void setW5(Boolean w5) {
		this.w5 = w5;
	}

	public Boolean getX1() {
		return x1;
	}

	public void setX1(Boolean x1) {
		this.x1 = x1;
	}

	public Boolean getX2() {
		return x2;
	}

	public void setX2(Boolean x2) {
		this.x2 = x2;
	}

	public Boolean getX3() {
		return x3;
	}

	public void setX3(Boolean x3) {
		this.x3 = x3;
	}

	public Boolean getX4() {
		return x4;
	}

	public void setX4(Boolean x4) {
		this.x4 = x4;
	}

	public Boolean getX5() {
		return x5;
	}

	public void setX5(Boolean x5) {
		this.x5 = x5;
	}

	public Boolean getY1() {
		return y1;
	}

	public void setY1(Boolean y1) {
		this.y1 = y1;
	}

	public Boolean getY2() {
		return y2;
	}

	public void setY2(Boolean y2) {
		this.y2 = y2;
	}

	public Boolean getY3() {
		return y3;
	}

	public void setY3(Boolean y3) {
		this.y3 = y3;
	}

	public Boolean getY4() {
		return y4;
	}

	public void setY4(Boolean y4) {
		this.y4 = y4;
	}

	public Boolean getY5() {
		return y5;
	}

	public void setY5(Boolean y5) {
		this.y5 = y5;
	}

	public Boolean getZ1() {
		return z1;
	}

	public void setZ1(Boolean z1) {
		this.z1 = z1;
	}

	public Boolean getZ2() {
		return z2;
	}

	public void setZ2(Boolean z2) {
		this.z2 = z2;
	}

	public Boolean getZ3() {
		return z3;
	}

	public void setZ3(Boolean z3) {
		this.z3 = z3;
	}

	public Boolean getZ4() {
		return z4;
	}

	public void setZ4(Boolean z4) {
		this.z4 = z4;
	}

	public Boolean getZ5() {
		return z5;
	}

	public void setZ5(Boolean z5) {
		this.z5 = z5;
	}

	public Boolean getA() {
		return a;
	}

	public void setA(Boolean a) {
		this.a = a;
	}

	public Boolean getB() {
		return b;
	}

	public void setB(Boolean b) {
		this.b = b;
	}

	public Boolean getC() {
		return c;
	}

	public void setC(Boolean c) {
		this.c = c;
	}

	public Boolean getD() {
		return d;
	}

	public void setD(Boolean d) {
		this.d = d;
	}

	public Boolean getE() {
		return e;
	}

	public void setE(Boolean e) {
		this.e = e;
	}

	public Boolean getF() {
		return f;
	}

	public void setF(Boolean f) {
		this.f = f;
	}

	public Boolean getG() {
		return g;
	}

	public void setG(Boolean g) {
		this.g = g;
	}

	public Boolean getH() {
		return h;
	}

	public void setH(Boolean h) {
		this.h = h;
	}

	public Boolean getI() {
		return i;
	}

	public void setI(Boolean i) {
		this.i = i;
	}

	public Boolean getJ() {
		return j;
	}

	public void setJ(Boolean j) {
		this.j = j;
	}

	public Boolean getK() {
		return k;
	}

	public void setK(Boolean k) {
		this.k = k;
	}

	public Boolean getL() {
		return l;
	}

	public void setL(Boolean l) {
		this.l = l;
	}

	public Boolean getM() {
		return m;
	}

	public void setM(Boolean m) {
		this.m = m;
	}

	public Boolean getN() {
		return n;
	}

	public void setN(Boolean n) {
		this.n = n;
	}

	public Boolean getGn() {
		return gn;
	}

	public void setGn(Boolean gn) {
		this.gn = gn;
	}

	public Boolean getO() {
		return o;
	}

	public void setO(Boolean o) {
		this.o = o;
	}

	public Boolean getP() {
		return p;
	}

	public void setP(Boolean p) {
		this.p = p;
	}

	public Boolean getQ() {
		return q;
	}

	public void setQ(Boolean q) {
		this.q = q;
	}

	public Boolean getR() {
		return r;
	}

	public void setR(Boolean r) {
		this.r = r;
	}

	public Boolean getS() {
		return s;
	}

	public void setS(Boolean s) {
		this.s = s;
	}

	public Boolean getT() {
		return t;
	}

	public void setT(Boolean t) {
		this.t = t;
	}

	public Boolean getU() {
		return u;
	}

	public void setU(Boolean u) {
		this.u = u;
	}

	public Boolean getV() {
		return v;
	}

	public void setV(Boolean v) {
		this.v = v;
	}

	public Boolean getW() {
		return w;
	}

	public void setW(Boolean w) {
		this.w = w;
	}

	public Boolean getX() {
		return x;
	}

	public void setX(Boolean x) {
		this.x = x;
	}

	public Boolean getY() {
		return y;
	}

	public void setY(Boolean y) {
		this.y = y;
	}

	public Boolean getZ() {
		return z;
	}

	public void setZ(Boolean z) {
		this.z = z;
	}

	public void setLetra(char c) {
		try {
			Field f = this.getClass().getDeclaredField("" + (c=='ñ' ? "gn" : c));
			f.set(this, true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}
