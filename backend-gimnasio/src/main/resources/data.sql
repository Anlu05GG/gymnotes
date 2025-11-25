DELETE FROM ejercicios;
ALTER TABLE ejercicios AUTO_INCREMENT = 1;

-- PECHO
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Press de banca', 'Pecho', 'Pectoral mayor con barra'),
('Press inclinado barra', 'Pecho', 'Énfasis parte superior'),
('Press inclinado mancuernas', 'Pecho', 'Mayor recorrido'),
('Press declinado', 'Pecho', 'Parte inferior del pectoral'),
('Aperturas mancuernas', 'Pecho', 'Aislamiento con amplitud'),
('Aperturas en polea alta', 'Pecho', 'Tensión continua'),
('Aperturas en polea baja', 'Pecho', 'Parte superior'),
('Crossover', 'Pecho', 'Cruce de poleas'),
('Press en máquina', 'Pecho', 'Trayectoria guiada'),
('Fondos para pecho', 'Pecho', 'En paralelas, torso inclinado');

-- ESPALDA
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Dominadas', 'Espalda', 'Tracción libre, dorsal ancho'),
('Dominadas supinas', 'Espalda', 'Énfasis bíceps'),
('Remo con barra', 'Espalda', 'Romboides y dorsal'),
('Remo con mancuernas', 'Espalda', 'Unilateral'),
('Remo en máquina', 'Espalda', 'Guiado'),
('Jalón al pecho', 'Espalda', 'Polea alta agarre ancho'),
('Jalón agarre supino', 'Espalda', 'Más bíceps'),
('Remo en polea baja', 'Espalda', 'Con triangulo'),
('Pullover en polea', 'Espalda', 'Aislamiento dorsal'),
('Peso muerto', 'Espalda', 'Cadena posterior y core'),
('Peso muerto rumano', 'Espalda', 'Isquios y lumbar');

-- HOMBROS
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Press militar de pie', 'Hombros', 'Deltoides anterior y medio'),
('Press militar sentado', 'Hombros', 'Estabilidad'),
('Press Arnold', 'Hombros', 'Rotación'),
('Elevaciones laterales', 'Hombros', 'Deltoides lateral'),
('Elevaciones frontales', 'Hombros', 'Deltoides anterior'),
('Pájaros mancuernas', 'Hombros', 'Deltoides posterior'),
('Pájaros en peck-deck', 'Hombros', 'Máquina'),
('Remo al mentón', 'Hombros', 'Trapecio y deltoides'),
('Face pull', 'Hombros', 'Deltoides posterior/rotadores'),
('Press hombro máquina', 'Hombros', 'Guiado');

-- BÍCEPS
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Curl barra', 'Bíceps', 'Bíceps braquial'),
('Curl barra Z', 'Bíceps', 'Menos tensión en muñeca'),
('Curl alterno', 'Bíceps', 'Trabajo unilateral'),
('Curl martillo', 'Bíceps', 'Braquiorradial'),
('Curl en banco inclinado', 'Bíceps', 'Estiramiento'),
('Curl concentrado', 'Bíceps', 'Aislamiento máximo'),
('Curl en predicador', 'Bíceps', 'Control del movimiento'),
('Curl polea baja', 'Bíceps', 'Tensión continua'),
('Curl cable con cuerda', 'Bíceps', 'Variante en polea');

-- TRÍCEPS
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Extensiones en polea', 'Tríceps', 'Agarre recto'),
('Extensiones con cuerda', 'Tríceps', 'Mayor rango final'),
('Press francés barra Z', 'Tríceps', 'En banco'),
('Press francés mancuernas', 'Tríceps', 'Unilateral'),
('Fondos en paralelas', 'Tríceps', 'Cerrado y vertical'),
('Fondos en banco', 'Tríceps', 'Con apoyo posterior'),
('Patada de tríceps', 'Tríceps', 'Aislamiento'),
('Press cerrado', 'Tríceps', 'En banca agarre estrecho');

-- PIERNAS (CUÁDRICEPS/GLÚTEO/ISQUIOS)
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Sentadilla trasera', 'Piernas', 'Cuádriceps y glúteo'),
('Sentadilla frontal', 'Piernas', 'Más cuádriceps'),
('Press de piernas', 'Piernas', 'Trabajo guiado'),
('Zancadas caminando', 'Piernas', 'Estabilidad y glúteo'),
('Zancada búlgara', 'Piernas', 'Unilateral avanzado'),
('Step-up', 'Piernas', 'Subida a cajón'),
('Extensiones de cuádriceps', 'Piernas', 'Aislamiento'),
('Curl femoral tumbado', 'Piernas', 'Isquios'),
('Curl femoral sentado', 'Piernas', 'Isquios sentado'),
('Peso muerto rumano', 'Piernas', 'Isquios y glúteo'),
('Hip thrust', 'Piernas', 'Glúteo mayor'),
('Puente de glúteo', 'Piernas', 'Variante suelo'),
('Abducciones en polea', 'Piernas', 'Glúteo medio'),
('Aducciones en máquina', 'Piernas', 'Aductores');

-- GEMELOS
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Elevación de talones de pie', 'Piernas', 'Gastrocnemio'),
('Elevación de talones sentado', 'Piernas', 'Sóleo'),
('Gemelos en prensa', 'Piernas', 'Recorrido amplio');

-- CORE / ABDOMEN
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Crunch', 'Abdomen', 'Recto abdominal'),
('Crunch en polea', 'Abdomen', 'Con carga'),
('Elevación de piernas colgado', 'Abdomen', 'Abdomen inferior'),
('Elevación de piernas tumbado', 'Abdomen', 'Variante suelo'),
('Plancha', 'Core', 'Isométrico'),
('Plancha lateral', 'Core', 'Oblicuos'),
('Rueda abdominal', 'Core', 'Antiextensión'),
('Pallof press', 'Core', 'Antirotación'),
('Toes to bar', 'Core', 'Avanzado');

-- ANTEBRAZO
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Curl muñeca barra', 'Antebrazo', 'Flexores'),
('Curl muñeca inverso', 'Antebrazo', 'Extensores'),
('Farmer walk', 'Antebrazo', 'Agarre estático');

-- CARDIO/COMPLEMENTOS (opcionales en catálogo)
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion) VALUES
('Remo ergómetro', 'Cardio', 'Trabajo full body'),
('Bicicleta estática', 'Cardio', 'Baja/mediana intensidad'),
('Cinta de correr', 'Cardio', 'Libre o inclinada'),
('Elíptica', 'Cardio', 'Impacto reducido');

