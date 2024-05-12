--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: class; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class (
    class_id integer NOT NULL,
    name character varying(15) NOT NULL
);


ALTER TABLE public.class OWNER TO postgres;

--
-- Name: class_class_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.class_class_id_seq OWNER TO postgres;

--
-- Name: class_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_class_id_seq OWNED BY public.class.class_id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question text NOT NULL,
    option_a text NOT NULL,
    option_b text NOT NULL,
    option_c text NOT NULL,
    option_d text NOT NULL,
    correct_option character(1) NOT NULL,
    level integer NOT NULL,
    subject_id integer NOT NULL,
    question_id integer NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_new_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_new_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_new_question_id_seq OWNER TO postgres;

--
-- Name: questions_new_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_new_question_id_seq OWNED BY public.questions.question_id;


--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    student_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    dob date NOT NULL,
    class_id integer
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_student_id_seq OWNER TO postgres;

--
-- Name: student_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_student_id_seq OWNED BY public.student.student_id;


--
-- Name: subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subject (
    subject_id integer NOT NULL,
    subject_name character varying(25) NOT NULL,
    class_id integer NOT NULL
);


ALTER TABLE public.subject OWNER TO postgres;

--
-- Name: subject_subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subject_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subject_subject_id_seq OWNER TO postgres;

--
-- Name: subject_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subject_subject_id_seq OWNED BY public.subject.subject_id;


--
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
    student_id integer NOT NULL,
    subject_id integer NOT NULL,
    score double precision NOT NULL,
    date_added timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    test_id integer NOT NULL
);


ALTER TABLE public.test OWNER TO postgres;

--
-- Name: test_test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.test_test_id_seq OWNER TO postgres;

--
-- Name: test_test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_test_id_seq OWNED BY public.test.test_id;


--
-- Name: class class_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class ALTER COLUMN class_id SET DEFAULT nextval('public.class_class_id_seq'::regclass);


--
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN question_id SET DEFAULT nextval('public.questions_new_question_id_seq'::regclass);


--
-- Name: student student_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student ALTER COLUMN student_id SET DEFAULT nextval('public.student_student_id_seq'::regclass);


--
-- Name: subject subject_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject ALTER COLUMN subject_id SET DEFAULT nextval('public.subject_subject_id_seq'::regclass);


--
-- Name: test test_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test ALTER COLUMN test_id SET DEFAULT nextval('public.test_test_id_seq'::regclass);


--
-- Data for Name: class; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class (class_id, name) FROM stdin;
1	Class1
2	Class2
3	Class3
4	Class4
5	Class5
6	Class6
7	Class7
8	Class8
9	Class9
10	Class10
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question, option_a, option_b, option_c, option_d, correct_option, level, subject_id, question_id) FROM stdin;
1 + 1 = 	1	2	3	4	b	1	1	1
1 + 2 = 	1	2	3	4	c	1	1	2
1 + 3 = 	1	2	3	4	d	1	1	3
1 + 4 = 	5	6	7	8	a	1	1	4
1 + 5 = 	5	6	7	8	b	1	1	5
1 + 6 = 	5	6	7	8	c	1	1	6
1 + 7 = 	5	6	7	8	d	1	1	7
1 + 8 = 	9	10	11	12	a	1	1	8
1 + 9 = 	9	10	11	12	b	1	1	9
1 + 10 = 	9	10	11	12	c	1	1	10
20+30	40	50	60	70	b	1	1	13
Compare the numbers and write = , > or < sign in between the numbers. 3,567 ——— 4,567	>	<	=	*	b	1	54	14
Compare the numbers and write = , > or < sign in between the numbers.  6,582 ——— 6,385	>	<	=	*	a	1	54	15
Compare the numbers and write = , > or < sign in between the numbers. 7,384 ——— 7,384	>	<	=	*	c	1	54	16
Write in figures Nine thousand three hundred fifteen.	9315	9153	9350	5193	a	1	54	17
Write in figures. Two thousand four hundred.	4200	2400	2000	400	b	1	54	18
Write in figures Seven thousand thirty six.	736	7000	70036	7036	d	1	54	19
Write the greatest 3-digit number.	999	333	998	1000	a	1	54	20
Write the smallest 3-digit number.	99	98	100	101	c	1	54	21
Write the greatest 4-digit number.	4444	4949	10000	9999	d	2	54	22
Write the smallest 4-digit number	1001	999	1000	9999	c	2	54	23
Write the greatest and the smallest 4-digit numbers using the following digits (without repeating the digits). 1, 2, 3, 4 	4321 and 1234	4321 and 2341	2431 and 1234	3231 and 2134	a	2	54	24
Write the greatest and the smallest 4-digit numbers using the following digits (without repeating the digits). 6, 3, 8, 0 	8206 and 2068	3680 and 6038	8630 and 3068	8630 and 0368	d	2	54	25
Write the following numbers in ascending order.  2456 ,2465 ,2565 ,2546	2456, 2565, 2546, 2465, 	2456, 2465, 2565,  2546	2456, 2465, 2546,  2565	2465, 2456, 2565,  2546	c	2	54	26
Write the following numbers in descending order 2947, 3038, 2930, 3830	3830, 2930, 3038, 2947	3830, 3038, 2930, 2947	3830, 2947, 3038,  2930	3830, 3038, 2947, 2930	d	2	54	27
Write the number that comes in ten thousand's place for fifty three thousand twenty five in place value chart is	10	5	2	3	b	2	54	28
Write 8×ten thousand + 5×thousand + 2×hundred + 7×ten + 6×unit in standard form.	85276	82576	86752	82675	a	2	54	29
Write 3 × 10,000 + 0 × 1,000 + 0 × 100 + 4 × 10 + 9 × 1 in standard form.	300049	3049	349	30049	d	2	54	30
Form the greatest and the smallest 5-digit numbers using the digits 9, 4, 6, 1, 3 without repeating them.	96431 and 13469	13469 and 96431 	93416 and 13469	96431 and 14369	a	3	54	31
Form the smallest 5-digit number using digits 4, 8, 0, 2, 5 without repeating them.	20548	85420	20458	02458	c	3	54	32
Write the skip numbers for the following.  23450 , 23700 , 23950, ______, _______	24200 and 24450	24250 and 24400	24350 and 24450	24150 and 24450	a	3	54	33
Write the skip numbers for the following. 25017 , 35017 , _____ , _____ , 65017.	45000 and 55000	45017 and 50017	45017 and 60017	45017 and 55017	d	3	54	34
Mr Mallappa purchased a scooter for himself and motor cycle for his son. The cost of the scooter is ` 34,221. The cost of the motor cycle is ` 35,678. Find the total amount paid by Mr. Mallappa to buy scooter and motor cycle.	68999	69999	69899	68899	c	3	54	35
A book seller sold 26,817 books in a book exhibition and sold 17,794 books in second book exhibition. Find the total number of books sold by him in both the book exhibitions.	45611	46411	43611	44611	d	3	54	36
36,417 + 32,532	68994	89994	68949	69894	c	3	54	37
25,236 + 34,051+ 8,368	67655	66755	65675	65657	a	3	54	38
There were 26,759 trees in the protected area of a forest. 13,842 trees were planted during vanamahostava. Find the total number of trees in the protected area of the forest.	45960	96450	40965	40596	d	3	54	39
A public library in a city has 17,943 books in Kannada, 14,635 books in Hindi and 10,284 books in English. How many books are there in the library altogether ?	42826	42862	42872	43872	b	3	54	40
Find the difference between 75,389 and 32,174	43315	43513	43251	43215	d	2	54	41
A coconut merchant purchased 49,137 coconuts. He sold 26,134 coconuts in a month. How many coconuts are left unsold ?	22003	23001	23003	23002	c	3	54	42
Last year 16,986 kg of rice was consumed for midday meals of primary school students. This year it is 21,482 kg of rice. How many more kg of rice is used this year ?	4496	4946	4694	4469	a	3	54	43
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (student_id, full_name, dob, class_id) FROM stdin;
1	Vidwan Gowda	2003-08-02	1
2	Varshith R	2003-04-08	1
506	Suhas	2002-12-08	5
\.


--
-- Data for Name: subject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subject (subject_id, subject_name, class_id) FROM stdin;
1	Maths	1
2	Science	1
54	Maths 5	5
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test (student_id, subject_id, score, date_added, test_id) FROM stdin;
1	1	10	2024-05-07 17:23:54.158065	1
1	1	10	2024-05-07 17:24:33.051826	2
1	1	10	2024-05-07 17:30:21.682312	3
1	1	3	2024-05-07 17:30:58.850857	4
2	1	3	2024-05-07 17:32:14.622533	5
1	1	3	2024-05-08 19:13:28.392954	6
1	1	3	2024-05-08 19:14:05.733036	7
1	1	3	2024-05-08 19:14:07.738001	8
1	1	7	2024-05-08 19:16:14.246533	9
1	1	6	2024-05-08 23:07:26.876326	10
1	1	5	2024-05-09 23:03:09.894146	11
1	1	5	2024-05-09 23:08:34.584057	12
1	1	6	2024-05-10 00:15:53.190804	13
1	1	8	2024-05-10 15:14:22.798874	14
506	54	1	2024-05-11 00:06:45.693585	15
\.


--
-- Name: class_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_class_id_seq', 1, false);


--
-- Name: questions_new_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_new_question_id_seq', 43, true);


--
-- Name: student_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_student_id_seq', 1, false);


--
-- Name: subject_subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subject_subject_id_seq', 1, false);


--
-- Name: test_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_test_id_seq', 15, true);


--
-- Name: class class_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_pkey PRIMARY KEY (class_id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (student_id);


--
-- Name: subject subject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (subject_id);


--
-- Name: test test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (test_id);


--
-- Name: questions questions_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(subject_id);


--
-- Name: student student_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: subject subject_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(class_id);


--
-- Name: test test_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- Name: test test_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(subject_id);


--
-- PostgreSQL database dump complete
--

