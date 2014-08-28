:- module(bc_main, [
    bc_main/1,
    bc_main/2,
    bc_environment/1 % -Env
]).

% Catch uncaught syntax errors and shut down
% when they occur.

% FIXME source_sink `prolog/bc/bc_data2' does not exist
% FIXME goal directive failed
% FIXME remove compile messages

user:message_hook(Term, error, _):-
    Term = error(syntax_error(_), _),
    message_to_string(Term, String),
    write(user_error, String), nl(user_error),
    halt(1).

:- use_module(library(http/thread_httpd)).
:- use_module(library(debug)).
:- use_module(library(docstore)).
:- use_module(library(arouter)).
:- use_module(library(st/st_expr)).
:- use_module(library(st/st_file)).
:- use_module(library(st/st_parse)).

:- use_module(bc_api).
:- use_module(bc_router).
:- use_module(bc_bust).
:- use_module(bc_view).
:- use_module(bc_admin).
:- use_module(bc_excerpt).
:- use_module(bc_data).
:- use_module(bc_data_migrate).

%! bc_environment(-Env) is det.
%
% Queries the current environment.
% Env is either an atom `production` or `development`.
% The environment is determined by the PL_ENV environment
% variable. All values other than production will enable
% the development environment.

:- dynamic(bc_environment/1).

% In development: most debug features.
% In production: enable simple-template and view caching.

:- if(getenv('PL_ENV', production)).
    :- asserta(bc_environment(production)).
    :- st_enable_cache.
    :- bc_view_enable_cache.
:- else.
    :- asserta(bc_environment(development)).
    :- write(user_error, 'Running in development mode!'), nl(user_error).
    :- use_module(library(http/http_error)).
    %:- debug(http(_)).
    :- debug(arouter).
    :- debug(docstore).
    :- debug(bc_data).
    :- debug(bc_data_migrate).
    :- debug(bc_data_comment).
    :- debug(bc_router).
    :- debug(bc_view).
    :- debug(bc_bust).
:- endif.

% Sets up simple-template.

:- st_enable_strip_white.
:- st_set_extension(html).
:- st_set_function(excerpt, 2, bc_excerpt).

% When platform is not Windows then it assumed that
% http_unix_daemon is supported.

:- if(not(current_prolog_flag(windows, true))).
    :- use_module(library(http/http_unix_daemon)).
    http_unix_daemon:http_server_hook(Options):-
        http_server(bc_route, Options).
:- endif.

:- dynamic(initialized).

%! bc_main(+File) is det.
%
% Opens docstore database and runs the
% frameworks setup code.

bc_main(_):-
    initialized, !.

bc_main(_):-
    current_prolog_flag(windows, true), !,
    throw(error(no_http_unix_daemon)).

bc_main(File):-
   bc_data_open(File),
   http_daemon,
   asserta(initialized).

%! bc_main(+File, +Options) is det.
%
% Same as bc_main/1 but does not use
% http_unix_daemon. Options are passed
% to http_server/2.

bc_main(_, _):-
    initialized, !.

bc_main(File, Options):-
    bc_data_open(File),
    http_server(bc_route, Options),
    asserta(initialized).
