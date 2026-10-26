#!/usr/bin/env python3
"""Build original labelled SVGs for the 18 Assessment 1 trigonometry questions."""
from pathlib import Path
from html import escape
import json
import math
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
QUIZ = ROOT / '3iec/Assessment 1 Revision Quizzes/Quiz 4 - Trigonometry'
ASSETS = QUIZ / 'diagrams'
ASSETS.mkdir(exist_ok=True)
data_path = QUIZ / 'quiz-data.json'
data = json.loads(data_path.read_text())
sin = lambda d: math.sin(math.radians(d))
cos = lambda d: math.cos(math.radians(d))
asin = lambda x: math.degrees(math.asin(x))
acos = lambda x: math.degrees(math.acos(x))


def triangle(a, b, c):
    """A=(0,0), C=(b,0), B in upper half-plane; a=BC, b=AC, c=AB."""
    x = (b*b+c*c-a*a)/(2*b)
    return [(0, 0), (x, math.sqrt(max(0, c*c-x*x))), (b, 0)]


def from_angles(A, B, a):
    b = a*sin(B)/sin(A)
    c = a*sin(180-A-B)/sin(A)
    return triangle(a, b, c)


def right(base, height):
    return [(0, 0), (base, 0), (base, height)]


# Each item specifies vertex names, given side labels, highlighted angle labels,
# optional right angle, and a complete accessible description. Coordinates are
# derived from valid triangles; calculated quantities are never printed.
specs = [
 dict(points=right(15,8), names='ABC', sides={(0,1):'15 cm',(1,2):'8 cm',(0,2):'17 cm'}, angles={0:''}, right=1,
      alt='Triangle ABC, right angle at B. AB is 15 cm, BC is 8 cm and hypotenuse AC is 17 cm. Find sin A.'),
 dict(points=right(7,24), names='PQR', sides={(0,1):'7 cm',(1,2):'24 cm',(0,2):'25 cm'}, angles={0:''}, right=1,
      alt='Triangle PQR, right angle at Q. PQ is 7 cm, QR is 24 cm and hypotenuse PR is 25 cm. Find cos P.'),
 dict(points=right(14*cos(23),14*sin(23)), names='', sides={(0,2):'14 cm',(1,2):'x cm'}, angles={0:'23°'}, right=1,
      alt='Right-angled triangle with a 23 degree angle, hypotenuse 14 cm and opposite side x cm to find.'),
 dict(points=right(9*cos(38)/sin(38),9), names='', sides={(0,2):'h cm',(1,2):'9 cm'}, angles={0:'38°'}, right=1,
      alt='Right-angled triangle with a 38 degree angle and opposite side 9 cm. Find hypotenuse h cm.'),
 dict(points=right(11*cos(54),11*sin(54)), names='', sides={(0,2):'11 cm',(0,1):'a cm'}, angles={0:'54°'}, right=1,
      alt='Right-angled triangle with a 54 degree angle and hypotenuse 11 cm. Find the adjacent side a cm.'),
 dict(points=right(14,9), names='', sides={(0,1):'14 cm',(1,2):'9 cm'}, angles={0:'θ'}, right=1,
      alt='Right-angled triangle. The side opposite theta is 9 cm and the adjacent side is 14 cm. Find theta.'),
 dict(points=right(10*cos(67),10*sin(67)), names='', sides={(0,2):'10 m ladder',(1,2):'h m'}, angles={0:'67°'}, right=1,
      alt='A 10 metre ladder leans against a vertical wall, making 67 degrees with level ground. Find the vertical height h metres.'),
 dict(points=right(12,5), names='DEF', sides={(0,2):'13 cm',(1,2):'5 cm'}, angles={0:'?'}, right=1,
      alt='Triangle DEF, right angle at E. Hypotenuse DF is 13 cm and EF is 5 cm. Find angle EDF at D.'),
 dict(points=from_angles(42,71,9), names='ABC', sides={(1,2):'9 cm',(0,2):'AC = ?'}, angles={0:'42°',1:'71°'},
      alt='Triangle ABC. A is 42 degrees, B is 71 degrees and BC is 9 cm. Find AC.'),
 dict(points=from_angles(68,asin(8*sin(68)/12),12), names='ABC', sides={(1,2):'12 cm',(0,2):'8 cm'}, angles={0:'68°',1:'?'},
      alt='Triangle ABC. A is 68 degrees, BC is 12 cm and AC is 8 cm. Find acute angle B.'),
 dict(points=from_angles(35,180-asin(12*sin(35)/8),8), names='ABC', sides={(1,2):'8 cm',(0,2):'12 cm'}, angles={0:'35°',1:'?'},
      alt='Triangle ABC with obtuse angle B. A is 35 degrees, BC is 8 cm and AC is 12 cm. Find B.'),
 dict(points=from_angles(48,76,10), names='ABC', sides={(1,2):'10 cm',(0,1):'AB = ?'}, angles={0:'48°',1:'76°'},
      alt='Triangle ABC. A is 48 degrees, B is 76 degrees and BC is 10 cm. Find AB.'),
 dict(points=from_angles(37,asin(13*sin(37)/9),9), names='ABC', sides={(1,2):'9 cm',(0,2):'13 cm'}, angles={0:'37°',1:'?'},
      alt='Triangle ABC. A is 37 degrees, BC is 9 cm and AC is 13 cm. Find acute angle B.'),
 dict(points=[(0,0),(8*cos(52),8*sin(52)),(11,0)], names='ABC', sides={(0,1):'8 cm',(0,2):'11 cm',(1,2):'BC = ?'}, angles={0:'52°'},
      alt='Triangle ABC. AB is 8 cm, AC is 11 cm and their included angle A is 52 degrees. Find BC.'),
 dict(points=[(0,0),(6*cos(118),6*sin(118)),(9,0)], names='', sides={(0,1):'6 cm',(0,2):'9 cm',(1,2):'x cm'}, angles={0:'118°'},
      alt='Triangle with sides 6 cm and 9 cm enclosing an obtuse angle of 118 degrees. Find third side x cm.'),
 dict(points=triangle(13,11,8), names='', sides={(0,1):'8 cm',(0,2):'11 cm',(1,2):'13 cm'}, angles={0:'θ'},
      alt='Triangle with sides 8 cm, 11 cm and 13 cm. Find theta, the angle opposite the 13 cm side.'),
 dict(points=triangle(7,14,10), names='', sides={(0,1):'10 cm',(0,2):'14 cm',(1,2):'7 cm'}, angles={0:'θ'},
      alt='Triangle with sides 7 cm, 10 cm and 14 cm. Find theta, the smallest angle opposite the 7 cm side.'),
 dict(points=[(0,0),(7*cos(134),7*sin(134)),(10,0)], names='OAB', sides={(0,1):'7 km',(0,2):'10 km',(1,2):'AB = ?'}, angles={0:'134°'},
      alt='Triangle AOB formed by two paths from O. OA is 7 km, OB is 10 km and angle AOB is 134 degrees. Find straight-line distance AB.'),
]


def make_svg(spec, index):
    raw = spec['points']
    minx, maxx = min(p[0] for p in raw), max(p[0] for p in raw)
    miny, maxy = min(p[1] for p in raw), max(p[1] for p in raw)
    scale = min(300/(maxx-minx), 170/(maxy-miny))
    points = [(230+(x-(minx+maxx)/2)*scale, 150-(y-(miny+maxy)/2)*scale) for x,y in raw]
    centre = tuple(sum(p[j] for p in points)/3 for j in (0,1))
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300">',
           f'<title>Question {index}: {escape(spec["alt"])}</title>',
           '<style>text{font-family:Arial,Helvetica,sans-serif;font-size:20px;paint-order:stroke;stroke:white;stroke-width:5px;stroke-linejoin:round} .vertex{font-size:19px;font-weight:bold;fill:#111827} .value{fill:#075985} .angle{font-size:19px;fill:#4338ca;font-weight:bold}</style>',
           '<polygon points="'+' '.join(f'{x:.3f},{y:.3f}' for x,y in points)+'" fill="none" stroke="#111827" stroke-width="2.5" stroke-linejoin="round"/>']
    def text(x,y,value,kind):
        svg.append(f'<text x="{x:.3f}" y="{y:.3f}" text-anchor="middle" dominant-baseline="middle" class="{kind}">{escape(value)}</text>')
    for vertex, name in enumerate(spec['names']):
        x,y=points[vertex];dx,dy=x-centre[0],y-centre[1];length=math.hypot(dx,dy)
        text(x+21*dx/length,y+21*dy/length,name,'vertex')
    for (i,j), label in spec['sides'].items():
        a,b=points[i],points[j];x,y=(a[0]+b[0])/2,(a[1]+b[1])/2
        nx,ny=-(b[1]-a[1]),b[0]-a[0];length=math.hypot(nx,ny);nx,ny=nx/length,ny/length
        if nx*(x-centre[0])+ny*(y-centre[1])<0:nx,ny=-nx,-ny
        # A long near-vertical label needs more horizontal clearance.
        distance=23 if abs(nx)<0.5 else max(30,4.8*len(label))
        text(x+distance*nx,y+distance*ny,label,'value')
    for i,label in spec['angles'].items():
        p=points[i];other=[points[j] for j in range(3) if j!=i]
        start=math.atan2(other[0][1]-p[1],other[0][0]-p[0]);end=math.atan2(other[1][1]-p[1],other[1][0]-p[0])
        delta=(end-start+math.pi)%(2*math.pi)-math.pi
        radius=30
        x1,y1=p[0]+radius*math.cos(start),p[1]+radius*math.sin(start)
        x2,y2=p[0]+radius*math.cos(end),p[1]+radius*math.sin(end)
        svg.append(f'<path d="M{x1:.3f},{y1:.3f} A{radius},{radius} 0 0,{1 if delta>0 else 0} {x2:.3f},{y2:.3f}" fill="none" stroke="#4338ca" stroke-width="1.5"/>')
        if label:
            mid=start+delta/2
            text(p[0]+54*math.cos(mid),p[1]+54*math.sin(mid),label,'angle')
    if 'right' in spec:
        i=spec['right'];p=points[i];ends=[points[j] for j in range(3) if j!=i]
        vectors=[((q[0]-p[0])/math.dist(p,q),(q[1]-p[1])/math.dist(p,q)) for q in ends]
        u,v=vectors;size=13
        corner=[(p[0]+size*u[0],p[1]+size*u[1]),(p[0]+size*(u[0]+v[0]),p[1]+size*(u[1]+v[1])),(p[0]+size*v[0],p[1]+size*v[1])]
        svg.append('<polyline points="'+' '.join(f'{x:.3f},{y:.3f}' for x,y in corner)+'" fill="none" stroke="#111827" stroke-width="1.5"/>')
    svg.append('</svg>')
    result='\n'.join(svg)+'\n'
    ET.fromstring(result)
    return result


assert len(specs)==len(data['questions'])==18
before=[{k:v for k,v in q.items() if k!='diagram'} for q in data['questions']]
for i,(question,spec) in enumerate(zip(data['questions'],specs),1):
    src=f'diagrams/question-{i:02}.svg'
    (QUIZ/src).write_text(make_svg(spec,i))
    question['diagram']={'src':src,'alt':spec['alt']}
data['quiz']['instructions']='Use a calculator in degree mode. Give numerical lengths and angles to 3 significant figures unless an exact value is requested. Angles are at the correspondingly named vertices. Use the labelled diagram with each question; diagrams are not drawn to scale.'
assert before==[{k:v for k,v in q.items() if k!='diagram'} for q in data['questions']]
data_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print('Built 18 SVG diagrams; question text, options, answer keys and workings preserved.')
