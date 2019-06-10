;;; syl-shell-translate-eng-spa.el --- Just a workpatch to google-translate using translate-shell.
;; Author: Syl. Montalvo
;; Created: Fri 15 Mar 19:22:12 GMT 2019 
;; Version: 2019.00.01

;; This file is NOT part of GNU Emacs.

;; 
;; As stated this tool makes use of translate-shell
;; Summary      : A command-line online translator
;; URL          : https://github.com/soimort/translate-shell
;; License      : Public Domain
;; Description  : Translate Shell (formerly Google Translate CLI) is a command-line
;; : translator powered by Google Translate (default), Bing
;; : Translator, Yandex.Translate and Apertium.

;; e.g. under Fedora-29:

;; $sudo dnf install translate-shell

;; Afterwards, download this file and place it in your load path, then add the following line to your emacs.d init file.

;; (require 'syl-shell-translate-eng-spa)

;;; Code:

(defun translate-to-any (x y)
  (interactive)
  (let ((tr (shell-command-to-string
             (format "trans :%s %s" x y))))
    (let ((temp-buff (get-buffer-create "*my-buff*")))
      (when (get-buffer "*my-buff*")
        (switch-to-buffer-other-window temp-buff))
      (set-buffer temp-buff)
      (with-current-buffer temp-buff
        (read-only-mode -1)
        (setf (buffer-string) "")
        (insert tr) 
        (goto-char (point-min))
        (read-only-mode)
        (local-set-key (kbd "q") 'delete-window)))))

;; (defun translate-to-eng0 ()
;;   (interactive)
;;   (translate-to-any "eng"
;;                     (read-string "what?.." ))) ;;Version0 ~~`

(defun translate-to-eng (x)
  (interactive
   (let ((w (if mark-active
                (buffer-substring
                 (region-beginning) (region-end))
              (word-at-point))))
     (list
      (read-string
       (format "translate to eng: (%s):" w) nil nil w))))
  (translate-to-any "eng" x))

(defun translate-to-spa (x)
  (interactive
   (let ((w (if mark-active
                (buffer-substring
                 (region-beginning) (region-end))
              (word-at-point))))
     (list
      (read-string
       (format "reverso translate: (%s):" w) nil nil w))))
  (translate-to-any "spa" x))


(global-set-key (kbd "\C-ct") 'translate-to-eng)
(global-set-key (kbd "\C-cr") 'translate-to-spa)


(provide 'syl-shell-translate-eng-spa)

;;; syl-shell-translate-eng-spa.el ends here.
