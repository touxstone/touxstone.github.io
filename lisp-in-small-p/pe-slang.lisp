(defun je-pe (string) (setf *s* (substitute #\SPACE #\- string)))
(defun je-pepa (string) (setf *s* (concatenate 'string (substitute #\p #\- string) "pe")))

(defun je-pepa (string) (concatenate 'string (substitute #\p #\- string) "pe"))

(defun split-by-one-space (string) (loop for i = 0 then (1+ j) as j = (position #\Space string :start i) collect (subseq string i j) while j))

(first (split-by-one-space *s*))
(first (rest (split-by-one-space *s*)))
(rest (rest (split-by-one-space *s*)))


ejercicio midverse function
(defun midverse (palabra) (concatenate 'string (subseq palabra 0 1) (reverse (subseq palabra 1 (- (length palabra) 1))) (subseq palabra (- (length palabra) 1))))

(je-pe "soquete")
(je-pepa "soquete te digo que eres soquete")
(midverse "soquete te digo que eres soquete")
