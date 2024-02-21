;;; syl-conjugate_and_replace.el --- Just a web-scrapping tool to help with verbs.
;; Copyright: (C) Syl Montalvo <ml.19161671@gmail.com>
;; Author	: Syl. Montalvo
;; URL		: https://raw.githubusercontent.com/touxstone/touxstone.github.io/master/syl-emacs-tips/syl-conjugate_and_replace.el
;; Created	: Wed 6 Feb 08:47:57 GMT 2019 
;; Version	: 2019.00.01
;; Keywords     : dictionary, verbs, conjugation

;; This file is NOT part of GNU Emacs.
;; This program is free software; you can redistribute it and/or
;; modify it under the terms of the GNU General Public License
;; as published by the Free Software Foundation; either version 3
;; of the License, or (at your option) any later version.

;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.

;; You should have received a copy of the GNU General Public License
;; along with this program; if not, write to the Free Software
;; Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
;; 02110-1301, USA.

;;; Commentary:
;; If you are not a native English speaker and decide to write in English, 
;; let's say assiduously, you will find yourself in the eventual situation 
;; of consulting your dictionary just as assiduously, especially for parts 
;; of speech containing verbs.
;; The tense of the verb drives the action in one direction or another in 
;; a very powerful way, but let's leave it here because it's not the subject
;; of this paper. The point is that you should check the verb tense at all 
;; times.  And, even if you find a good source for your checks, you have 
;; surely felt how tiresome it is to go so many times to the same place no 
;; matter how efficient it is to find what you are looking for, the case 
;; here is having to go back and forth so many times even to consult the same
;; verb, it happens, yes. Or not, but it's not about that either. 
;; The point is that you find that you have to go to the same place over 
;; and over and over again, all the time. So, wouldn't it be nice to have 
;; a keyboard shortcut as a facility in the editor so that at hit it the list 
;; of possible options would appear on the screen, giving you the option to 
;; choose, replace, and continue typing. That is the purpose of this tool.
;; Something quite simple but intricate in equal proportion. And this is 
;; the introduction to the task I intended to solve with this tool.
;; The second stage is to show you the source of information which happens to be
;; this beautiful place https://ultralingua.com/.
;; Go and check out the verb conjugation section - the developer section -
;; how it shows your query and what the interface is there, both the GUI interface
;; and the JSON syntax that we're going to make use of.
;; 
;;
;;; Installation:

;; All will be about placing this script in your load path, for instance:
;;
;; (add-to-list 'load-path "/full/path/where/syl-conjugate_and_replace.el/in")
;;
;; and making a requiring line in your `emacs.init`
;; (require 'syl-conjugate_and_replace)
;; 
;; And, that's it. To call the function, locate your prompt next (or before) 
;; the verb target and hit 's-c' ("s" is the Windows key, just in case) though
;; you can customise this combination at will. 
;; Then, as mentioned above, the options will appear in the Emacs modeline area,
;; choose accordinlgly with the arrow keys, then press Enter.

;;; Code:

(require 'cl-macs)
(require 'cl)

(defun just-get-raw (url)
  (interactive)
  (progn
    (require 'json)
    (with-current-buffer (url-retrieve-synchronously url)
      (goto-char (point-min))
      (re-search-forward "^$")
      (json-read))))

(defun extract (i)
  (do ((i1 i (rest i1))
       (pool nil (cons (cdr (car (car i1))) pool)))
      ((null i1) pool)))

(defun non-repeated-pool (x)
  (do ((x1 x (rest x1))
       (pool nil (if (member (first x1) pool) pool 
                   (cons (first x1) pool))))
      ((null x1) pool)))

(defun first5 (x)
  (do ((x1 x (rest x1))
       (pool nil (cons (first x1) pool)))
      ((= (length pool) 5) pool)))

(defun new-conjugator0 (verb)
  (let ((xurl (format "http://api.ultralingua.com/api/2.0/conjugations/eng/%s" verb)))
    (first5
     (non-repeated-pool
      (extract
       (append
        (cdr
         (car
          (cdr
           (car
            (append
             (just-get-raw xurl) nil))))) nil))))))

(defun choose-one (x)
  (let ((completion-prompt "Replacement: "))
    (completing-read completion-prompt x)))

(defun conjugating-and-replace (s)
  (interactive
   (let ((verb (if mark-active
                   (buffer-substring (region-beginning) (region-end))
                 (word-at-point))))
     (list
      (read-string
       (format "pls, help spelling tense of: (%s):" verb) nil nil verb))))
  (let ((res (choose-one (new-conjugator0 s))))
    (when res
      (if (use-region-p)
          (delete-region (region-beginning) (region-end))
        (if (word-at-point)
            (delete-region
             (beginning-of-thing 'word) (end-of-thing 'word)) nil))
      (insert res))))

;; You can change this shortcut at will. 
(global-set-key (kbd "s-c") 'syl-conjugate_and_replace)



(provide 'syl-conjugate_and_replace)
;;; syl-conjugate_and_replace.el ends here


